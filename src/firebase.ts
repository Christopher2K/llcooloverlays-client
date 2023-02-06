import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getDatabase, type Database } from 'firebase/database';
import { PUBLIC_FIREBASE_CLIENT, PUBLIC_FIREBASE_DATABASE } from '$env/static/public';

export let app: FirebaseApp;
export let db: Database;

export function initializeFirebase() {
  app = initializeApp({
    ...JSON.parse(PUBLIC_FIREBASE_CLIENT),
    databaseURL: PUBLIC_FIREBASE_DATABASE,
  });

  db = getDatabase(app);
}

export * from 'firebase/database'
