import firebase from 'firebase/app'
import 'firebase/storage'

var config = {
   apiKey: "AIzaSyDUCPyPpnWRzqSipjEH5O-nbu4-VPd7OAc",
   authDomain: "youtencil-a36fd.firebaseapp.com",
   databaseURL: "https://youtencil-a36fd.firebaseio.com",
   projectId: "youtencil-a36fd",
   storageBucket: "youtencil-a36fd.appspot.com",
   messagingSenderId: "669056370019"
 };

firebase.initializeApp(config);

const storage = firebase.storage()

export { storage, firebase as default }
