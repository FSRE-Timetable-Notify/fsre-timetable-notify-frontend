import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBl7SKSrU1u8QQwIgiaSpS8J70d7sET_TI",
  appId: "1:236658525220:web:c04d689f7a7fe52edac4b1",
  authDomain: "fsre-timetable-notify.firebaseapp.com",
  measurementId: "G-46Q0F88MKK",
  messagingSenderId: "236658525220",
  projectId: "fsre-timetable-notify",
  storageBucket: "fsre-timetable-notify.appspot.com",
};

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

export { messaging };
