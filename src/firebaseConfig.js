import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyAEODa1l-90mTrbaZv-J3PpkrfWtS0PibE",
	authDomain: "cakelicious-3fde1.firebaseapp.com",
	projectId: "cakelicious-3fde1",
	storageBucket: "cakelicious-3fde1.appspot.com",
	messagingSenderId: "921291275190",
	appId: "1:921291275190:web:f6a6bdcc15b2edf7745f17",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(app);
