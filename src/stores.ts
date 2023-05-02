import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail, updatePassword, updateProfile, type User } from "firebase/auth";
import { writable } from "svelte/store";
import { auth } from "./lib/firebase";
import { boolean, type string } from "zod";
import { dbHandler } from "./utils";

export const isDark = writable<boolean>(false);
export const userInfo = writable<App.IUser | null>(null);

export const authStore = writable({
    isLoading: true,
    currentUser: null
} as {
    isLoading: boolean,
    currentUser: User | null
});

/**
 * @deprecated
 */
export const authHandlers = {
    login: async (email: string, password: string) => {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        authStore.set({isLoading: false, currentUser: userCredentials.user});
    },
    signup: async (email: string, password: string, name: string, surname: string, displayName: string) => {
        try {
            const userCredentials = (await createUserWithEmailAndPassword(auth, email, password));
            await updateProfile(userCredentials.user, {displayName: displayName});
            await dbHandler.newUser(userCredentials.user, {
                avatarURL: "null",
                displayName: userCredentials.user.displayName ?? "null",
                name: name,
                surname: surname
            });
            return true;
        } catch (error) {
            return error;
        }
    },
    logout: async () => {
        await signOut(auth);
    },
    resetPassword: async (email:string) => {
        await sendPasswordResetEmail(auth, email);
    },
    updateEmail: async (email: string) => {
       // await updateEmail(auth.currentUser ?? , email);
    },
    updatePassword: async (password: string) => {
        // await updatePassword(aiu)
    }

}