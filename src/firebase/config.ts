import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";
 

const firebaseConfig = {
    apiKey: "AIzaSyBbYPuFNxC4n-5MIdIkbTV1v1vlNX8cy_4",
    authDomain: "weight-monitoring-72a33.firebaseapp.com",
    projectId: "weight-monitoring-72a33",
    storageBucket: "weight-monitoring-72a33.appspot.com",
    messagingSenderId: "52178258898",
    appId: "1:52178258898:web:8a972b11f6050b869d960b",
  };


//   init firebase
     const projectFirebase = initializeApp(firebaseConfig);

//   init services
    export const db = getFirestore(projectFirebase)
    export const projectStorage = getStorage(projectFirebase)

    // eslint-disable-next-line import/no-anonymous-default-export
    
