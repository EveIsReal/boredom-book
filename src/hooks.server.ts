import { redirect, type Handle, type RequestHandler, json } from "@sveltejs/kit";
import { dbHandler, mobileUserAgents } from "./utils";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "$lib/firebase";
import { currentUser } from "./stores";


export const handle: Handle = async ({event, resolve}) => {
    // console.log(event.request.headers.get("user-agent"));
    if(mobileUserAgents.includes(await json(event.request.headers.get("user-agent")).json()) && event.route.id !== "/fallback") {
        
        throw redirect(303, "/fallback");
    }

    const session = event.cookies.get("session");
    if(!session) {
        return await resolve(event);
    }

    const querySnapshot = await getDocs(query(collection(db, "users"), where("userAuthToken", "==", session)));
    const user = querySnapshot.docs[0];

    if(user) {
        event.locals.user = {
            displayName: user.get("displayName"),
            passwordHash: user.get("hashed_password"),
            uid: user.get("uid"),
            name: user.get("name"),
            surname: user.get("surname")
        }
        // event.locals.user.avatarURL = await dbHandler.getUserPfpURL(event.locals.user.uid);
        event.locals.user.friends = [
            (await dbHandler.getUser("tim.b00"))?.data() as App.IUser
        ]
        currentUser.set(event.locals.user);
    }
    

    event.cookies.delete("fallback");
    return await resolve(event);
}

// export const GET: RequestHandler = (event) => {
//     return json({
//         userAgent: event.request.headers.get("user-agent")
//     });
// }