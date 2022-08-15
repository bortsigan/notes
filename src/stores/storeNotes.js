import { defineStore } from 'pinia'

export const useStoreNotes = defineStore('storeNotes', {
	state: () => {
		return { 
			notes: [
				{
					id: 1,
					content: `As with computed properties`
				},
				{
					id: 2,
					content: ` you can combine multiple getters`
				}
			]
		}
	},
	actions: {
		addNote(note) {
			this.notes.unshift({
				id: Date.now(),
				content: note
			});
		},
		deleteNote(id) {
			this.notes = this.notes.filter(note => {
				return note.id !== id;
			});
		},
		editNote(id, content) {
			let index = this.notes.findIndex(note => note.id == id);
			console.log(content);
			this.notes[index].content = content;
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