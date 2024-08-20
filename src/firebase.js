import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDswg_8cfLw9uVXAME5KxKuEFFbGX38t_Q",
  authDomain: "project-new---copy.firebaseapp.com",
  projectId: "project-new---copy",
  storageBucket: "project-new---copy.appspot.com",
  messagingSenderId: "504127004969",
  appId: "1:504127004969:web:25f2a6c629c62c87e71738",
  measurementId: "G-ZX1ELPTZVF"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

