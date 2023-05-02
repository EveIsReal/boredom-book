import type { redirect, Handle } from "@sveltejs/kit";
import { dbHandler } from "./utils";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "$lib/firebase";


export const handle: Handle = async ({event, resolve}) => {
    const session = event.cookies.get("session");
    if(!session) {
        return await resolve(event);
    }

    const querySnapshot = await getDocs(query(collection(db, "users"), where("userAuthToken", "==", session)));
    const user = querySnapshot.docs[0];

    if(user) {
        event.locals.user = {
            displayName: user.get("displayName"),
        }
    }
    


    return await resolve(event);
}