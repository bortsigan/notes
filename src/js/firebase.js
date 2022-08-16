import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBF_Bzo_1-_GMeSo7bpxASt7e81yIMkOD4',
  authDomain: 'notes-5baf9.firebaseapp.com',
  projectId: 'notes-5baf9',
  storageBucket: 'notes-5baf9.appspot.com',
  messagingSenderId: '964530482796',
  appId: '1:964530482796:web:54fd808bf9ffbbbd25b249'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
	db
}