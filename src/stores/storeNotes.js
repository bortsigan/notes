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

const targetTable = "notes";
const collectionRef = collection(db, targetTable);
const notesCollection = query(collectionRef, orderBy("date", "asc"));

export const useStoreNotes = defineStore('storeNotes', {
	state: () => {
		return { 
			notes: []
		}
	},
	actions: {
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
			await deleteDoc(doc(db, targetTable, id));
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
			onSnapshot(notesCollection, (notesSnapShot) => {
				let notes = [];
				notesSnapShot.forEach((note) => {
					notes.unshift({
						id: note.id,
						content: note.data().content,
						date: note.data().date
					})
				});
				this.notes = notes;
			});
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