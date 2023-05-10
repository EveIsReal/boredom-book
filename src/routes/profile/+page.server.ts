import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ request, locals }) => {
    if(locals.user) {
        throw redirect(303, `/profile/${locals.user.displayName.toLowerCase()}`);
    }
}