import { auth, db, storage } from "$lib/firebase";
import { redirect, type Cookies } from "@sveltejs/kit";
import type { FirebaseError } from "firebase/app";
import type { User } from "firebase/auth";
import { QueryDocumentSnapshot, addDoc, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where, type DocumentData } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Crypto from "node:crypto"

export const mobileUserAgents = [
    "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1",
    "Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; SCH-I535 Build/KOT49H) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30",
    "Mozilla/5.0 (Linux; Android 7.0; SM-G930V Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.125 Mobile Safari/537.36",
    "Mozilla/5.0 (Linux; Android 7.0; SM-A310F Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.91 Mobile Safari/537.36 OPR/42.7.2246.114996",
    "Opera/9.80 (Android 4.1.2; Linux; Opera Mobi/ADR-1305251841) Presto/2.11.355 Version/12.10",
    "Opera/9.80 (J2ME/MIDP; Opera Mini/5.1.21214/28.2725; U; ru) Presto/2.8.119 Version/11.10",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_2 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) OPiOS/10.2.0.93022 Mobile/11D257 Safari/9537.53",
    "Mozilla/5.0 (Android 7.0; Mobile; rv:54.0) Gecko/54.0 Firefox/54.0",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) FxiOS/7.5b3349 Mobile/14F89 Safari/603.2.4",
    "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
]


export const toggleDark = (dark: true | false) => {
    if(dark) {
        document.documentElement.dataset.theme = "dark";
    } else document.documentElement.dataset.theme = "light";
}

export const validateNonNull = (object: any | undefined | null) => {
    if(object !== undefined || object !== null) return object;
} 
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// const analytics = getAnalytics(app);

export const dbHandler = {
    newUser: async (options: {name: string, password: string, displayName: string, surname: string, avatarURL?: string}) => {
        if(!(await dbHandler.hasUser(options.displayName))) {

            try {
                // CREATE DOC IN FIRESTORE WITH USER'S UID
                await setDoc(doc(db, "users", `${options.displayName.toLowerCase()}`), {
                    uid: makeid(),
                    displayName: options.displayName,
                    name: options.name,
                    surname: options.surname,
                    avatarURL: "default_pfp.jpg",
                    passwordHash: options.password
                    
                } as App.IUser);

            } catch (error) {
                return error as FirebaseError;
            }
        } 
    },

    getUser: async (displayName: string | undefined) => {
        if(displayName === undefined) return;
        return await getDoc(doc(db, `users`, displayName));
    },
    hasUser: async (displayName: string) => {
        return (await getDoc(doc(db, `users`, displayName))).exists();
    },
    updateUser: async (displayName: string, data: object) => {
        await updateDoc(doc(db, "users", displayName), data);
        return dbHandler.getUser(displayName);
    },
    queryWhereEquals: async (col: string, field: string, value: string) => {
        const querySnapshot = await getDocs(query(collection(db, col), where(field, "==", value)));
        querySnapshot.docs.forEach(doc => {
            if(doc.get(field) === value) return doc;
        });
    },
    setUserPfp: async (uid: string, imageUpload: Blob) => {
        const imageRef = ref(storage, `images/${uid}/pfp_${uid}.jpg`);
        await uploadBytes(imageRef, await imageUpload.arrayBuffer());
    },
    getUserPfpURL: async (uid: string) => {
        try {
            return await getDownloadURL(ref(storage, `images/${uid}/pfp_${uid}.jpg`));
        } catch (error) {
            console.log(`No pfp for ${uid}`);
            
            return "default_pfp.jpg";
        }
    }
}

export function makeid() {
    return Crypto.randomBytes(16).toString("base64").slice(0, 16).replace("/", "S");
}
