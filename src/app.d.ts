// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwVZKGgXn8grq0aD-3LPeC1ReNZQ8PTKQ",
  authDomain: "kayvault-c8416.firebaseapp.com",
  projectId: "kayvault-c8416",
  storageBucket: "kayvault-c8416.appspot.com",
  messagingSenderId: "301903522799",
  appId: "1:301903522799:web:120d69cad558d4c7b2e41a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export {};
