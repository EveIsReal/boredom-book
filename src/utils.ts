import { auth, db } from "$lib/firebase";
import { redirect, type Cookies } from "@sveltejs/kit";
import type { FirebaseError } from "firebase/app";
import type { User } from "firebase/auth";
import { QueryDocumentSnapshot, addDoc, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where, type DocumentData } from "firebase/firestore";

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
    newUser: async (user: User, options: {name: string, displayName: string, surname: string, avatarURL: string}) => {
        if(!(await dbHandler.hasUser(user.uid))) {

            try {
                // CREATE DOC IN FIRESTORE WITH USER'S UID
                await setDoc(doc(db, "users", `${user.displayName}`), {
                    uid: user.uid,
                    email: user.email,
                    avatarURL: options.avatarURL,
                    displayName: options.displayName,
                    name: options.name,
                    surname: options.surname
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
    }
}
