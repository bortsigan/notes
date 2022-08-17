import { defineStore } from 'pinia'
import { 
	collection,
	orderBy,
	getDocs,  
	query, 
	where, 
	onSnapshot, 
	doc,
	setDoc,
	addDoc,
	deleteDoc,
	updateDoc
} from 'firebase/firestore';
import { db } from '@/js/firebase';
import { useStoreAuth } from '@/stores/storeAuth';

const targetTable = "notes";
//const collectionRef = collection(db, 'users', 'SCBHwVcrYEgG3u2v6HGfgGFKGQC2', targetTable);
//const notesCollection = query(collectionRef, orderBy("date", "asc"));

let collectionRef;
let notesCollection;
let getNotesSnapshot;

export const useStoreNotes = defineStore('storeNotes', {
	state: () => {
		return { 
			notes: [],
			notesLoaded: false
		}
	},
	actions: {
		init() {
			const storeAuth = useStoreAuth();

			/**
			 * prevent access from different users even on manual input of user ID
			 * find it in Firestore database / rules tab
			 * 
			 */
			collectionRef = collection(db, 'users', storeAuth.user.id, targetTable);
			notesCollection = query(collectionRef, orderBy("date", "asc"));

			this.getNotes()
		},
		async addNote(content) {
			let date = Date.now().toString();
			// await setDoc(doc(collectionRef , Date.now().toString()), {
			// 	id, // id: id
			// 	content // content: content
			// }); // to allow user to generate its own ID

			await addDoc(collectionRef, {
				content,
				date
			}); // to allow firestore to generate its own ID
		},
		async deleteNote(id) {
			// https://firebase.google.com/docs/firestore/manage-data/delete-data?hl=en&authuser=0
			// this.notes = this.notes.filter(note => {
			// 	return note.id !== id;
			// });

			await deleteDoc(doc(collectionRef, id));
		},
		async editNote(id, content) {
			// let index = this.notes.findIndex(note => note.id == id);
			// console.log(content);
			// this.notes[index].content = content;
			
			// https://firebase.google.com/docs/firestore/manage-data/add-data?hl=en&authuser=0
			await updateDoc(doc(collectionRef, id), {
				content
			})
		},
		async getNotes() {
			this.notesLoaded = false;

			getNotesSnapshot = onSnapshot(notesCollection, (notesSnapShot) => {
				let notes = [];
				notesSnapShot.forEach((note) => {
					notes.unshift({
						id: note.id,
						content: note.data().content,
						date: note.data().date
					})
				});
				this.notes = notes;
				this.notesLoaded = true;
			}, error => {
				alert(error.message);
			});
		},
		clearNotes() {
			this.notes = [];

			if (getNotesSnapshot) {
				// unsubscrbie active listener to prevent calling on different snapshot collection aside from the current logged in user
				getNotesSnapshot(); 
			}
		}
	},
	getters: {
		// getters are object property assigned into a function
		getNote: (state) => {
			return (id) => {
				return state.notes.filter(note => note.id == id)[0];
			};
		},
		totalNotesCount: (state) => {
			return state.notes.length;
		},
		totalCharactersCount: (state) => {
			let total = 0;

			state.notes.forEach(note => {
				total += note.content.length;
			})

			return total;
		}
	}
})