<template>
	<div class="auth">
		<div class="tabs is-centered">
			<ul>
				<li :class="{ 'is-active': !register }"><a @click.prevent="register = false">Login</a></li>
				<li :class="{ 'is-active': register }"><a @click.prevent="register = true">Register</a></li>
			</ul>
		</div>

		<div class="card auth-form">
			<div class="card-content">
				<div class="title has-text-centered">
					{{ formTitle }}
				</div>
				<form>
					<div class="form">
						<div class="field">
							<p class="control has-icons-left has-icons-right">
								<input class="input" type="email" placeholder="Email" v-model="credentials.email"/>
								<span class="icon is-small is-left">
									<i class="fas fa-envelope"></i>
								</span>
								<span class="icon is-small is-right">
									<i class="fas fa-check"></i>
								</span>
							</p>
						</div>
						<div class="field">
							<p class="control has-icons-left">
								<input class="input" type="password" placeholder="Password" v-model="credentials.password" />
								<span class="icon is-small is-left">
									<i class="fas fa-lock"></i>
								</span>
							</p>
						</div>
						<div class="field is-grouped is-grouped-right">
							<p class="control">
								<button type="button" class="button is-primary"  @click.prevent="submitForm">
									{{ formTitle }}
								</button>
							</p>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useStoreAuth } from '@/stores/storeAuth'
// import Login from '@/views/forms/Login.vue'

/**
 * stores
 */
let storeAuth = useStoreAuth();

let register = ref(false);
let formTitle = computed(() => {
	return register.value === true ? 'Register' : 'Login';
})

/**
 * credentials
 */
let credentials = reactive({
	email: '',
	password: ''
})

/** 
 * submit form
 */
let submitForm = () => {
	if (!credentials.email || !credentials.password) {
		alert("Email and Password are required");
	} else {
		if (register.value) {
			storeAuth.register(credentials)
		} else {
			storeAuth.loginUser(credentials);
		}
	}
}
</script>

<style>
.auth-form {
	max-width: 600px;
	margin: 0 auto;
}
</style>