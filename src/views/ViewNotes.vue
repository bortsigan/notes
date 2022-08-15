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
		<Note v-for="note in storeNotes.notes" :note="note" :key="note.id"/>
		<!-- <Note v-for="note in storeNotes.notes" :note="note" :key="note.id" @deleteANote="deleteNote"/> -->
	</div>
</template>

<script setup>
import { ref } from 'vue';

import Note from '@/components/Notes/Note.vue';
import AddEditNote from '@/components/Notes/AddEditNote.vue';

import { useStoreNotes } from '@/stores/storeNotes';
import { watchCharacters } from '@/use/watchCharacters';

let note = ref("");
let addEditNoteRef = ref("");
let storeNotes = useStoreNotes();

let addNote = () => {
	storeNotes.addNote(note.value);

	note.value = null; // for the value 
	addEditNoteRef.value.focusTextarea();
}

// watchCharacters(note);

// if naay gipasa gikan sa <Note />
// let deleteNote = (targetId) => {
// 	notes.value = notes.value.filter(note => {
// 		return note.id !== targetId;
// 	});
// }
</script>