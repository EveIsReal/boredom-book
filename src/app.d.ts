// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import { User } from "firebase/auth";

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
		interface IUser {
			displayName: string,
			avatarURL?: string,
			name?: string,
			surname?: string,
		}
		
		interface Locals {
			user: IUser | null
		}
	}
	interface RegisterFormData {
		email: string
		username: string,
		password: string,
		passwordConfirm: string;
		name: string,
		surname: string
	}
}

export {
	__global
};
