import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAAQ6jFGL9adkaysciFCBpJMsQgNfAx6q0",
  authDomain: "project-booking-c01b6.firebaseapp.com",
  projectId: "project-booking-c01b6",
  storageBucket: "project-booking-c01b6.appspot.com",
  messagingSenderId: "305045811074",
  appId: "1:305045811074:web:eeaa04d04e87b685d2a99b",
  measurementId: "G-TXP0NQPK1D",
};
console.log(firebaseConfig);
const app = initializeApp(firebaseConfig);
export const storage: any = getStorage(app);
console.log(storage);
