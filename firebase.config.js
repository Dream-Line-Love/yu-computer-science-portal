import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAKQR6-0HZnu45olBy6oMZ4-RJDNSLS7_I",
  authDomain: "yu-comp-sci-portal.firebaseapp.com",
  projectId: "yu-comp-sci-portal",
  storageBucket: "yu-comp-sci-portal.appspot.com",
  messagingSenderId: "648944383890",
  appId: "1:648944383890:web:6106c798494864d3cb334b",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
