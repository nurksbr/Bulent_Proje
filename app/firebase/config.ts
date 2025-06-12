import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXx",
  authDomain: "bulentsatis-63476.firebaseapp.com",
  projectId: "bulentsatis-63476",
  storageBucket: "bulentsatis-63476.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:1234567890123456789012"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 