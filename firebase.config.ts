// src/firebase.config.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxnVlMDN5tF755YQY92lAyL7GLaZVxnqs",
  authDomain: "tayin-project.firebaseapp.com",
  projectId: "tayin-project",
  storageBucket: "tayin-project.appspot.com",
  appId: "1:561913083334:web:dff692bb3ba6d9f6602ec7",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

 