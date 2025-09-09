// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'dotenv/config';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig: any = process.env.NEXT_PUBLIC_FIREBASE_CONFIG_KEY;

// Initialize Firebase
export const app = initializeApp(JSON.parse(firebaseConfig));
