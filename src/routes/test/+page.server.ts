import { fail, type Actions } from "@sveltejs/kit";
import { dbHandler } from "../../utils";
import { getBytes, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "$lib/firebase";
import type { PageServerLoad } from "../$types";

export const actions: Actions = {
    upload: async ({ request, locals }) => {
        const user = locals.user;

        if(!user) return fail(500, {
            error: {
                code: "ERR_USR_INVALID",
                message: "Es gab einen Fehler beim Erkennen des akutellen Nutzers."
            }
        });

        const formData = await request.formData();
        const file = formData.get("file-upload") as Blob;
        console.log(file);
        await dbHandler.setUserPfp( user?.uid, file );
    }
}

export const load: PageServerLoad = async ({ locals }) => {

    try {
        const imageRef = ref(storage, `images/${locals.user?.uid}/pfp_${locals.user?.uid}.jpg`);
        const url = await getDownloadURL(imageRef);

        return {
            data: {
                images: [
                    url
                ]
            }
        }
    } catch (error) {
        return {
            data: {
                images: [
                    "default_pfp.jpg"
                ]
            }
        }
    }
}