import admin from 'firebase-admin';
import { PUBLIC_FIREBASE_PROJECT_ID, PUBLIC_FIREBASE_DATABASE_URL } from '$env/static/public';
import { env } from '$env/dynamic/private';
import fs from 'fs';
import path from 'path';

/**
 * Aggressively cleans a private key string to ensure it's valid PEM.
 */
const cleanPrivateKey = (key: string | undefined) => {
	if (!key) return '';
	return key
		.replace(/\\n/g, '\n')
		.replace(/\\\\n/g, '\n')
		.replace(/^"|"$/g, '')
		.replace(/^'|'$/g, '')
		.trim();
};

if (!admin.apps.length) {
	try {
		let credential;

		// 1. Try loading from service-account.json first (Local Dev)
		const serviceAccountPath = path.join(process.cwd(), 'service-account.json');

		if (fs.existsSync(serviceAccountPath)) {
			try {
				const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
				if (serviceAccount.private_key) {
					serviceAccount.private_key = cleanPrivateKey(serviceAccount.private_key);
				}
				credential = admin.credential.cert(serviceAccount);
				console.log('Firebase Admin: Initialized from service-account.json');
			} catch (e) {
				console.error('Firebase Admin: Failed to load service-account.json:', e);
			}
		}

		// 2. Try individual env vars (Preferred Production)
		if (!credential && env.FIREBASE_CLIENT_EMAIL && env.FIREBASE_PRIVATE_KEY) {
			try {
				const privateKey = cleanPrivateKey(env.FIREBASE_PRIVATE_KEY);
				credential = admin.credential.cert({
					projectId: PUBLIC_FIREBASE_PROJECT_ID,
					clientEmail: env.FIREBASE_CLIENT_EMAIL,
					privateKey
				});
				console.log('Firebase Admin: Initialized from individual env variables');
			} catch (e) {
				console.error('Firebase Admin: Individual env var initialization failed:', e);
			}
		}

		// 3. Fallback to FIREBASE_SERVICE_ACCOUNT_JSON env var (Legacy Production)
		if (!credential && env.FIREBASE_SERVICE_ACCOUNT_JSON) {
			try {
				let jsonStr = env.FIREBASE_SERVICE_ACCOUNT_JSON.trim();
				if (jsonStr.startsWith("'") && jsonStr.endsWith("'")) jsonStr = jsonStr.slice(1, -1);

				const serviceAccount = JSON.parse(jsonStr);
				if (serviceAccount.private_key) {
					serviceAccount.private_key = cleanPrivateKey(serviceAccount.private_key);
				}
				credential = admin.credential.cert(serviceAccount);
				console.log('Firebase Admin: Initialized from JSON env variable');
			} catch (e) {
				console.error('Firebase Admin: Env variable parsing failed:', e);
			}
		}

		if (credential) {
			admin.initializeApp({
				credential,
				projectId: PUBLIC_FIREBASE_PROJECT_ID,
				databaseURL: PUBLIC_FIREBASE_DATABASE_URL
			});
		} else {
			console.error('Firebase Admin: No valid credentials found.');
		}
	} catch (error) {
		console.error('Firebase Admin: Critical initialization error:', error);
	}
}

export const adminDb = admin.apps.length > 0 ? admin.database() : null;
