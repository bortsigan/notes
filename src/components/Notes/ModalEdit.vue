<template>
	<div class="modal is-active p-2">
		<div class="modal-background"></div>
		<div class="modal-card">
			<header class="modal-card-head">
				<p class="modal-card-title">Edit Note</p>
				<button class="delete" aria-label="close" @click="closeModal"></button>
			</header>
			<section class="modal-card-body">
				<label for="textarea" class="has-text-white">Edit Note</label>
				<div class="field">
					<div class="control">
						<textarea 
							class="textarea" 
							placeholder="Edit your notes here ..." 
							ref="textareaRef"
							v-model="noteContent"
							v-autofocus
						></textarea>
					</div>
				</div>
				Count: <span class="text is-success">{{ noteContent? noteContent.length : 0  }}</span>
			</section>
			<footer class="modal-card-foot is-justify-content-flex-end">
				<button class="button" @click="closeModal">Cancel</button>
				<button 
					class="button is-primary" 
					@click="editNote"
					:disabled="!noteContent"
				>Update Note</button>
			</footer>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { vAutofocus } from '@/directives/vAutofocus'
import { useStoreNotes } from '@/stores/storeNotes'
import { onClickOutside } from '@vueuse/core'

let storeNotes = useStoreNotes();

let props = defineProps({
	note: {
		type: Object,
		default: {}
	}
});

let noteContent = ref(props.note.content);

let emit = defineEmits(['update:modelValue']);

let closeModal = () => {
	emit('update:modelValue', false);
}

/**
 * click outside to close
 */
let closeOrCancel = ref("");
onClickOutside(closeOrCancel, closeModal);

let editNote = () => {
	storeNotes.editNote(props.note.id, noteContent.value);
	closeModal();
}


/**
 * event handlers
 */
let handleCancelOrUpdate = (e) => {
	if (e.key === "Escape") {
		closeModal();
	}

	if (e.key === "Enter") {
		editNote();
	}
}
/**
 * on mounted lifecycle hooks (incredible)
 */
onMounted(() => {
	addEventListener('keyup', handleCancelOrUpdate)
});

onUnmounted(() => {
	removeEventListener('keyup', handleCancelOrUpdate); // must remove event listener to prevent duplication of firing the event
})

</script>