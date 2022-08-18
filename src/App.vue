<template>
	<NavBar />
	<div class="container is-max-desktop px-2 py-2" v-cloak>
		<!-- <progress v-if="storeAuth.isLoading" class="progress is-large is-success" max="100"/>
		<router-view class="mb-2" v-else/> -->
		<Suspense>
		<!-- component with nested async dependencies -->
		<ViewStats />

		<!-- loading state via #fallback slot -->
		<template #fallback>
			Loading...
		</template>
		</Suspense>
	</div>
</template>

<script setup>
import  { onMounted } from 'vue'
import NavBar from '@/components/Layout/NavBar.vue'
import { useStoreAuth } from '@/stores/storeAuth'
import ViewStats from '@/views/ViewStats.vue'

let storeAuth = useStoreAuth(); 

onMounted(() => {
	storeAuth.init();
})
</script>