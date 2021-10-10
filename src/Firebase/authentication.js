import firebaseConfig from "./Firebase.config";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

//Initialize Firebase
initializeApp(firebaseConfig);

const auth = getAuth();

export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((res) => {
      // Signed in
      const user = {
        isSigned: true,
        name: res.user.displayName,
        email: res.user.email,
        password: password,
        message: "User Logged In Successfully",
      };
      return user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const user = {
        isSigned: false,
        name: "",
        email: "",
        password: "",
        message: errorMessage,
      };
      return user;
    });
};

export const createUser = (name, email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((res) => {
      const user = {
        isSigned: true,
        name: name,
        email: email,
        password: password,
        message: "User Created Successfully",
      };
      updateUsername(name);
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const user = {
        isSigned: false,
        name: "",
        email: "",
        password: "",
        message: errorMessage,
      };
      return user;
    });
};

export const signout = () => {
  return signOut(auth)
    .then(() => {
      const user = {
        isSigned: false,
        name: "",
        email: "",
        password: "",
        message: "User Signed out Successfully",
      };
      return user;
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
};

const updateUsername = (name) => {
  updateProfile(auth.currentUser, {
    displayName: name,
  })
    .then(() => {
      console.log("username Updated");
    })
    .catch((error) => {
      console.log(error.message);
    });
};
