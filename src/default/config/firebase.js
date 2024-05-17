
import { initializeApp } from "firebase/app";

import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "hotpal-cff0d.firebaseapp.com",
  projectId: "hotpal-cff0d",
  storageBucket: "hotpal-cff0d.appspot.com",
  messagingSenderId: "808585706330",
  appId: "1:808585706330:web:09409912a854e99ab8d163"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);