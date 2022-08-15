<template>
	<div :class="`card has-background-${ bgColor }-dark p-4 mb-5`">
		<label for="textarea" class="has-text-white">{{ label }}</label>
		<div class="field">
			<div class="control">
				<textarea 
					class="textarea" 
					:placeholder="placeholder" 
					ref="textareaRef"
					v-model="modelValue"
					@input="$emit('update:modelValue', modelValue)"
					v-autofocus
				></textarea>
			</div>
		</div>
		Count: <span class="text is-success">{{ modelValue? modelValue.length : 0  }}</span>
		<div class="field is-grouped is-grouped-right">
			<div class="control">
				<slot name="buttons" />
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { vAutofocus } from '@/directives/vAutofocus';


let textareaRef = ref("");
let focusTextarea = () => {
	textareaRef.value.focus()
}

/** pre defined functions */
let props = defineProps({
	modelValue: {
		type: String,
		default: null
	},
	bgColor: {
		type: String,
		default: 'success'
	},
	placeholder: {
		type: String,
		default: 'Write your notes here ...'
	},
	label: {
		type: String,
		default: 'Add Note'
	}
});

defineExpose({
	focusTextarea
})

</script>