<template>
	<div class="modal is-active p-2">
		<div class="modal-background"></div>
		<div class="modal-card" ref="closeOrCancel">
			<header class="modal-card-head">
				<p class="modal-card-title">Delete Note</p>
				<button class="delete" aria-label="close" @click="closeModal"></button>
			</header>
			<section class="modal-card-body">
				Are you sure you want to delete this note?
			</section>
			<footer class="modal-card-foot is-justify-content-flex-end">
				<button class="button" @click="closeModal">Cancel</button>
				<button class="button is-danger">Delete</button>
			</footer>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { onClickOutside } from '@vueuse/core'

defineProps({
	modelValue: {
		type: Boolean,
		default: false
	}
})

let emit = defineEmits(['update:modelValue']);

let closeModal = () => {
	emit('update:modelValue', false);
}

/**
 * click outside to close
 */
let closeOrCancel = ref("");
onClickOutside(closeOrCancel, closeModal);

/**
 * on mounted lifecycle
 */

let handleEscapeEvent = (e) => {
	console.log('close it');
	if (e.key === "Escape") closeModal();
}
onMounted(() => {
	addEventListener('keyup', handleEscapeEvent)
});

onUnmounted(() => {
	removeEventListener('keyup', handleEscapeEvent); // must remove event listener to prevent duplication of firing the event
})
</script>