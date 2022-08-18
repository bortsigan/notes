<template>
	<NavBar />
	<div class="container is-max-desktop px-2 py-2" v-cloak>
		<progress v-if="storeAuth.isLoading" class="progress is-large is-success" max="100"/>
		<router-view class="mb-2" v-else/>
	</div>
</template>

<script setup>
import  { onMounted } from 'vue'
import NavBar from '@/components/Layout/NavBar.vue'
import { useStoreAuth } from '@/stores/storeAuth'

let storeAuth = useStoreAuth(); 

onMounted(() => {
	storeAuth.init();
})
</script>