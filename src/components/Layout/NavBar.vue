<template>
	<nav class="navbar is-success" role="navigation" aria-label="main navigation">
		<div class="container is-max-desktop px-2">
			<div class="navbar-brand">
				<div class="navbar-item is-size-4 is-family-monospace">Notes</div>
					<a
						@click.prevent="showMobileNav = !showMobileNav"
						role="button" 
						class="navbar-burger" 
						aria-label="menu" 
						aria-expanded="false" 
						:class="{ 'is-active': showMobileNav }"
						ref="closeNavBar"
					>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
				</a>
			</div>

			<div 
				class="navbar-menu" 
				:class="{ 'is-active': showMobileNav }"
				ref="navBarMenuRef"
			>
				<div class="navbar-start">
					<button 
						v-if="storeAuth.user.id"
						type="button" 
						class="button is-small is-info mt-3 ml-3" 
						@click="logout"
					>Logout {{ storeAuth.user.email }}</button>
				</div>
				<div class="navbar-end">
					<router-link @click="showMobileNav = false" :to="{name: 'notes'}" class="navbar-item" active-class="is-active">Notes</router-link>
					<router-link @click="showMobileNav = false" :to="{name: 'stats'}" class="navbar-item" active-class="is-active">Stats</router-link>
				</div>
			</div>
		</div>
		
	</nav>
</template>
<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useStoreAuth } from '@/stores/storeAuth';

let showMobileNav = ref(false);
let storeAuth = useStoreAuth();

/**
 * click outside to close
 */
let navBarMenuRef = ref("");
let closeNavBar = ref("")
onClickOutside(
	navBarMenuRef, //target
	() => { showMobileNav.value = false; }, // handler
	{ ignore: [closeNavBar] } // options
);

/**
 * logout
 */
let logout = () => {
	showMobileNav.value = false;
	storeAuth.logoutUser();
}

</script>

<style>
@media (max-width:1023px) {
	.navbar-menu {
		position: absolute;
		left: 0;
		width: 100%;
	}
}
</style>