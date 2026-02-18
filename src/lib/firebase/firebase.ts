import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, update, child } from 'firebase/database';
import type { PlayerKnowledgeScores } from '../../types/score';

const firebaseConfig = {
	apiKey: 'AIzaSyCtSxk7kAxROQVaCU9nTyh0YFy0eSbpZpo',
	authDomain: 'who-knows-who-98da7.firebaseapp.com',
	databaseURL: 'https://who-knows-who-98da7-default-rtdb.firebaseio.com',
	projectId: 'who-knows-who-98da7',
	storageBucket: 'who-knows-who-98da7.firebasestorage.app',
	messagingSenderId: '1098159458396',
	appId: '1:1098159458396:web:18bec54c2f30a16192be99',
	measurementId: 'G-R6WJY9RSD3'
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

// Function to set up the initial database structure and fetch scores - logic moved to server-side or unused
// Keeping file for client-side db initialization

