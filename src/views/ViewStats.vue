<template>
	<div class="view-stats">
		<table class="table is-fullwidth">
			<thead>
				<tr>
					<th>Stats</th>
					<th>Value</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Number of notes</td>
					<td>{{ storeNotes.totalNotesCount }}</td>
				</tr>
				<tr>
					<td>Number of character (of all notes)</td>
					<td>{{ storeNotes.totalCharactersCount }}</td>
				</tr>
			</tbody>
		</table>
		<input
			class="input"
			type="text"
			placeholder="Do you love notes?"
			v-autofocus
			v-model="notes"
		/>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useStoreNotes } from '@/stores/storeNotes';
import { vAutofocus } from '@/directives/vAutofocus';
import { watchCharacters } from '@/use/watchCharacters';

let storeNotes = useStoreNotes();
let notes = ref("");

watchCharacters(notes, 20);
</script>