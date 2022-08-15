import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

/**
 * components
 */
import ViewNotes from '@/views/ViewNotes.vue'
import ViewStats from '@/views/ViewStats.vue'
import ViewEditNote from '@/views/ViewEditNote.vue'

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
];
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes// same as routes: routes
})

export default router
