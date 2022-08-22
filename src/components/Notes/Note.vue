<template>
	<div class="card mb-4">
		<div class="card-content">
			<div class="content">
				{{ note.content }}
				<div class="columns is-mobile has-text-grey-light mt-2">
					<small class="column">Date: {{ dateFormat }}</small>
					<small class="column has-text-right">{{ characterLength }}</small>
				</div>
			</div>
		</div>
		<footer class="card-footer">
		<a href="#" class="card-footer-item" @click.prevent="modals.editNote = true">Edit</a>
		<a href="#" class="card-footer-item" @click.prevent="modals.deleteNote = true">Delete</a>
		<!-- <router-link class="card-footer-item" :to="{name: 'note-edit', params:{id: note.id} }">Edit</router-link> !-->
		<!--<a href="#" class="card-footer-item" @click.prevent="storeNotes.deleteNote(note.id)">Delete</a> from pinia!-->
		<!--<a href="#" class="card-footer-item" @click.prevent="deleteNote(note.id)">Delete</a> from emits !-->
		</footer>
		<ModalDelete v-if="modals.deleteNote" v-model="modals.deleteNote" :note="note.id"/>
		<ModalEdit v-if="modals.editNote" v-model="modals.editNote" :note="note"/>
	</div>
</template>

<script setup>
import { computed, reactive } from 'vue';
import { useDateFormat } from '@vueuse/core';
import ModalDelete from '@/components/Notes/ModalDelete.vue'
import ModalEdit from '@/components/Notes/ModalEdit.vue'

let props = defineProps({
	note: {
		type: Object,
		default: {}
	}
});

/**
 * computed
 */

let dateFormat = computed(() => {
	let date = new Date(parseInt(props.note.date));
	let formatted = useDateFormat(date, "MM/DD/YYYY @ HH:mm");
	
	return formatted.value;
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
	editNote: false
});

// child -> parent
// let emit = defineEmits(['deleteANote']);
// let deleteNote = (id) => {
// 	emit('deleteANote', id);
// }
</script>