import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { useStoreAuth } from '@/stores/storeAuth'
/**
 * components
 */
import ViewNotes from '@/views/ViewNotes.vue'
import ViewStats from '@/views/ViewStats.vue'
import ViewEditNote from '@/views/ViewEditNote.vue'
import ViewAuth from '@/views/ViewAuth.vue'

const routes = [
	{
		path: '/',
		name: 'notes',
		component: ViewNotes
	},
	{
		path: '/stats',
		name: 'stats',
		component: ViewStats
	},
	{
		path: '/note-edit/:id',
		name: 'note-edit',
		component: ViewEditNote
	},
	{
		path: '/login',
		name: 'login',
		component: ViewAuth
	},
];
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes// same as routes: routes
})

// navigation guards
router.beforeEach(async (to, from) => {
	const storeAuth = useStoreAuth()
	if (
		// make sure the user is authenticated
		!storeAuth.user.id && 
		// avoid an infinite redirect
		to.name !== 'login'
	) { // if not logged in
		return { name: 'login' } // redirect to login
	}
	if (storeAuth.user.id && to.name === 'login') { // if logged in
		return false
	}
})

export default router
