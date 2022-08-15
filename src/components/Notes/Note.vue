<template>
	<div class="card mb-4">
		<div class="card-content">
			<div class="content">
				{{ note.content }}
				<div class="has-text-right has-text-grey-light mt-2">
					<small>{{ characterLength }}</small>
				</div>
			</div>
		</div>
		<footer class="card-footer">
		<router-link class="card-footer-item" :to="{name: 'note-edit', params:{id: note.id} }">Edit</router-link>
		<a href="#" class="card-footer-item" @click.prevent="modals.deleteNote = true">Delete</a>
		<!--<a href="#" class="card-footer-item" @click.prevent="storeNotes.deleteNote(note.id)">Delete</a> from pinia!-->
		<!--<a href="#" class="card-footer-item" @click.prevent="deleteNote(note.id)">Delete</a> from emits !-->
		</footer>
		<ModalDelete v-if="modals.deleteNote" v-model="modals.deleteNote"/>
	</div>
</template>

<script setup>
import { computed, reactive } from 'vue';
import { RouterLink } from 'vue-router'
import { useStoreNotes } from '@/stores/storeNotes';
import ModalDelete from '@/components/Notes/ModalDelete.vue'

let storeNotes = useStoreNotes();
let props = defineProps({
	note: {
		type: Object,
		default: {}
	}
});

let characterLength = computed(() => {
	let length = props.note.content.length;

	return length > 1 
		? `${length} characters` 
		: `${length} character` ;
});

/**
 * modals
 */
let modals = reactive({
	deleteNote: false,
	//editNote: false
});

// magamit ra og naa sa parent component ang eh delete nga note
// let emit = defineEmits(['deleteANote']);
// let deleteNote = (id) => {
// 	emit('deleteANote', id);
// }
</script>