<template>
	<NavBar />
	<div class="container is-max-desktop px-2 py-2">
		<router-view class="mb-2"/>
	</div>
</template>

<script setup>
import  { onMounted } from 'vue'
import NavBar from '@/components/Layout/NavBar.vue'
import { useStoreNotes } from '@/stores/storeNotes';

let storeNotes = useStoreNotes(); 

onMounted(() => {
	storeNotes.getNotes();
})
</script>