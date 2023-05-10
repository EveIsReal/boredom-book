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
			uid: string,
			displayName: string,
			passwordHash: string,
			name?: string,
			surname?: string,
			friends: IUser[],
			notifications: {
				in: Notification[],
				out: Notification[],
				friend_requests: FriendRequest[] 
			}
		}

		interface Notification {
			from: string,
			title: string,
			message: string
		}
		interface FriendRequest {
			from: string,
			pending: boolean,
		}
		
		interface Locals {
			user: IUser | null
		}
	}
	interface RegisterFormData {
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
