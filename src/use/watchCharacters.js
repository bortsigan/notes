import  { watch } from 'vue';

export let watchCharacters = (element, maxChars = 100) => {
	watch(element, (chars) => {
		if (chars.length === maxChars) {
			alert(`Way to go buddy! You reached ${ maxChars } characters`);
		}
	});
}
