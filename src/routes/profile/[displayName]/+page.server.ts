import { fail } from "@sveltejs/kit";
import { dbHandler } from "../../../utils";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, params, locals }) => {
    const user = await dbHandler.getUser(params.displayName);
    
    if(!user?.exists()) 
    return {
        user: null,
        status: 404,
        error: {
            code: "ERR_USR_NOT_FOUND",
            message: "There is no user with this discriminator."
        },
        success: false
    }

    if(!(user.get("uid") === locals.user?.uid)) {
        return {
            user: user.data(),
            status: 200,
            permitted: false,
            success: true,
            error: {}
        }
    }


    return {
        user: user.data() as App.IUser,
        status: 200,
        error: {},
        success: true,
        permitted: true
    };
}