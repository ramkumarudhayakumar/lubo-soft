import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyADd9ZJRFh_ltoCvuNjxcG-vp_KD6pxl0U",
  authDomain: "lubo-soft-37dea.firebaseapp.com",
  projectId: "lubo-soft-37dea",
  storageBucket: "lubo-soft-37dea.appspot.com",
  messagingSenderId: "722415017643",
  appId: "1:722415017643:web:913bfac56c099390b0e1ee",
};

initializeApp(firebaseConfig);

const db = getFirestore();

export { db };
