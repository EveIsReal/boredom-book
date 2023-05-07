import { fail, type Actions, redirect } from "@sveltejs/kit";
import { dbHandler } from "../../utils";
import type { LoginFormData } from "../../form";
import Crypto from "node:crypto";

export const actions: Actions = {
    default: async ({ request, cookies, locals }) => {
        const formData = Object.fromEntries(await request.formData()) as unknown as LoginFormData;

        // Validate data i.e check db
        if(!await dbHandler.hasUser(formData.name.toLowerCase())) {
            return fail(400, {
                error: {
                    code: "ERR_USR_NOT_VALID",
                    message: "Es gibt keinen Nutzer mit diesem Namen, oder diesem Passwort!"
                }
            })
        } else {
            const user = await dbHandler.getUser(formData.name.toLowerCase());
            // const userPassword = await compare(formData.password, user?.get("password_hash"));
            const hash = Crypto.createHash("sha256").update(formData.password).digest("base64");

            // console.log(hash);

            const userPassword = hash === user?.get("passwordHash");

            // console.log(userPassword);
            

            if(!userPassword) {
                return fail(400, {
                    error: {
                        code: "ERR_USR_NOT_FOUND",
                        message: "Es gibt keinen Nutzer mit diesem Namen oder Passwort."
                    }
                });
            }

            const authUser = await dbHandler.updateUser(formData.name.toLowerCase(), { userAuthToken: crypto.randomUUID() });

            cookies.set("session", authUser?.get("userAuthToken"), { path: "/", httpOnly: true, sameSite: "strict", 
            secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 24 * 30 });

            const name = authUser?.get("displayName");

            throw redirect(303, "/");

        }
    }
}