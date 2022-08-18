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
		component: ViewNotes,
		meta: { requiresAuth: true }
	},
	{
		path: '/stats',
		name: 'stats',
		component: ViewStats,
		meta: { requiresAuth: true }
	},
	{
		path: '/note-edit/:id',
		name: 'note-edit',
		component: ViewEditNote,
		meta: { requiresAuth: true }
	},
	{
		path: '/login',
		name: 'login',
		component: ViewAuth,
		meta: { requiresAuth: false }
	},
];
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes// same as routes: routes
})

// navigation guards
router.beforeEach(async (to, from) => {
	const storeAuth = useStoreAuth()

	console.clear();
	console.log('to: ', to);

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
