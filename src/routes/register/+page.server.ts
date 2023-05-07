import { fail, type Actions, redirect } from "@sveltejs/kit";
import { dbHandler } from "../../utils";
import Crypto from "node:crypto"

export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const formData = Object.fromEntries(await request.formData()) as any as RegisterFormData;
        if(await dbHandler.hasUser(formData.username)) {
            return fail(400, {
                error: {
                    code: "ERR_USR_EXISTS",
                    message: "Es gibt bereits einen Nutzer mit diesem Namen."
                }
            });
        } 
        // Form is valid

        await dbHandler.newUser({
            displayName: formData.username,
            name: formData.name,
            surname: formData.surname,
            password: Crypto.createHash("sha256").update(formData.password).digest("base64")
        });

        // SIGN USER IN

        const authUser = await dbHandler.updateUser(formData.username.toLowerCase(), { userAuthToken: crypto.randomUUID() });

        cookies.set("session", authUser?.get("userAuthToken"), { path: "/", httpOnly: true, sameSite: "strict", 
        secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 24 * 30 }); 

        throw redirect(303, "/");
    }
}