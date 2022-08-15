<template>
	<div class="edit-note">
		<AddEditNote
			v-model="editedNote"
			ref="addEditNoteRef" 
			bgColor="primary" 
			placeholder="Rewrite your notes here..."
			label="Edit Note"
		>
			<template v-slot:buttons>
				<router-link class="button is-link is-light mx-3" :to="{name:'notes'}">Cancel</router-link>
				<button 
					class="button is-link" 
					@click="editNote"
					:disabled="!note"
				>Update Note</button>
			</template>
		</AddEditNote>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import AddEditNote from '@/components/Notes/AddEditNote.vue';
import { useStoreNotes } from '@/stores/storeNotes';

let storeNotes = useStoreNotes();
let route = useRoute();
let router = useRouter();

let note = storeNotes.getNote(route.params.id);
let editedNote = ref("");
let addEditNoteRef = ref("");

editedNote.value = note.content;

let editNote = () => {
	storeNotes.editNote(route.params.id, editedNote.value);
	router.push({name: 'notes'});
}
</script>