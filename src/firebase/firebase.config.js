// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUE4GZZssu2CxVoJE9t-gU9_kFXE7EPz0",
  authDomain: "courses-6aded.firebaseapp.com",
  projectId: "courses-6aded",
  storageBucket: "courses-6aded.appspot.com",
  messagingSenderId: "1012704462725",
  appId: "1:1012704462725:web:0dc31f11cf268ec11d26ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app