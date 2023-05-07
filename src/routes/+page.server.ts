import { auth } from "$lib/firebase";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { get } from "svelte/store";
import { authStore, userInfo } from "../stores";

export const load: PageServerLoad = async ({locals}) => {

    
    if(locals.user) {
        return {
            user: locals.user
        }
    } else throw redirect(303, "/login");
}