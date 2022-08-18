<template>
	<div class="view-notes">
		<AddEditNote v-model="note" ref="addEditNoteRef">
			<template v-slot:buttons>
				<button 
					:disabled="!note"
					class="button is-link" 
					@click="addNote"
				>Add New Note</button>
			</template>
		</AddEditNote>
		
		<progress v-if="!storeNotes.notesLoaded" class="progress is-large is-success" max="100"/>

		<template v-else> 
			<!-- 
				1. best practice is it should be wrapped whenever there is a if else condition 
				2. condition statements and loops statement should not be declared in on component
					ex: 
					<Note v-if="true" v-for="note" /> NO!
			!-->
			<Note v-for="note in storeNotes.notes" :note="note" :key="note.id"/>

			<div 
				v-if="!storeNotes.notes.length" 
				class="is-size-4 has-text-centered has-text-grey-light is-family-monospace py-6"
				>No notes to be displayed!</div>
		</template>
		<!-- <Note v-for="note in storeNotes.notes" :note="note" :key="note.id" @deleteANote="deleteNote"/> -->
	</div>
</template>

<script>
import { ref } from 'vue';

import Note from '@/components/Notes/Note.vue';
import AddEditNote from '@/components/Notes/AddEditNote.vue';

import { useStoreNotes } from '@/stores/storeNotes';
import { watchCharacters } from '@/use/watchCharacters';

export default {
	async setup() {
		let note = ref("");
		let addEditNoteRef = ref("");
		let storeNotes = useStoreNotes();

		let addNote = () => {
			storeNotes.addNote(note.value);

			note.value = null; // for the value 
			addEditNoteRef.value.focusTextarea();
		}

		return {
			note,
			addEditNoteRef,
			storeNotes,
			addNote
		}
	}
}

//watchCharacters(note.value);


// if naay gipasa gikan sa <Note />
// let deleteNote = (targetId) => {
// 	notes.value = notes.value.filter(note => {
// 		return note.id !== targetId;
// 	});
// }
</script>