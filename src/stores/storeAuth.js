import { defineStore } from 'pinia'
import { 
	createUserWithEmailAndPassword, 
	signInWithEmailAndPassword, 
	signOut, 
	onAuthStateChanged // for login state changes https://firebase.google.com/docs/auth/web/manage-users?hl=en&authuser=0
} from "firebase/auth";
import { auth } from '@/js/firebase'

export const useStoreAuth = defineStore('storeAuth', {
	state: () => {
		return { 
			user: []
		}
	},
	actions: {
		init() {
			onAuthStateChanged(auth, (user) => {
				if (user) {
					// User is signed in, see docs for a list of available properties
					// https://firebase.google.com/docs/reference/js/firebase.User					
					this.user = {
						id: user.uid,
						email: user.email
					};
					this.router.push('/')
				} else {
					this.user = {};
					this.router.replace('/login')
				}
			});
		},
		register(credentials) {
			createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
			.then((userCredential) => {
				const user = userCredential.user;

				console.log(user);

			})
			.catch((error) => {
				// const errorCode = error.code;
				// const errorMessage = error.message;
				
				console.warn("error message:", error.message);
			});
		},
		loginUser({email, password}) {
			signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				
			})
			.catch((error) => {
				// const errorCode = error.code;
				// const errorMessage = error.message;

				console.log("error message: " , error.message);
			});
		},
		logoutUser() {
			signOut(auth).then(() => {
				console.log('signed out');
			}).catch((error) => {
				console.warn("error message: ", error.message);
			});
		}
	},
	getters: {
		
	}
})