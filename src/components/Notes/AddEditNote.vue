<template>
	<div :class="`card has-background-${ bgColor }-dark p-4 mb-5`">
		<label for="textarea" class="has-text-white">{{ label }}</label>
		<div class="field">
			<div class="control">
				<!-- <textarea 
					class="textarea" 
					:placeholder="placeholder" 
					ref="textareaRef"
					v-model="modelValue"
					@input="$emit('update:modelValue', modelValue)"
					v-autofocus
				></textarea> 
				v-model was changed to :value
				emit modelValue was changed to $event.target.value ( acessing the value of the textarea itself )
				-->
				<textarea 
					class="textarea" 
					:placeholder="placeholder" 
					ref="textareaRef"
					:value="modelValue"
					@input="$emit('update:modelValue', $event.target.value)"
					v-autofocus
				></textarea>
			</div>
		</div>
		<span class="tag is-light">Count: {{ modelValue? modelValue.length : 0  }}</span>
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
		type: [String, Number],
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