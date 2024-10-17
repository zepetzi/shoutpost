import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, connectStorageEmulator, ref } from "firebase/storage";
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const fsdb = getFirestore();
export const imgStorage = getStorage();
export const thumbStorage = getStorage(app, 'post_thumbs');
export const pfpStorage = getStorage(app, 'user_pfps');
export const imgStorageRef = ref(imgStorage);
export const thumbStorageRef = ref(thumbStorage);
export const pfpStorageRef = ref(pfpStorage);

export const functions = getFunctions(app);
connectFunctionsEmulator(functions, "127.0.0.1", 5001);

// // const imgStorage = getStorage();
// if (location.hostname === "localhost") {
//   // Point to the Storage emulator running on localhost.
//   connectStorageEmulator(imgStorage, "127.0.0.1", 9199);
// } 
