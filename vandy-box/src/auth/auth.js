import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth } from "../firebase";
import { db } from "../firebase";

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  login_hint: "example@vanderbilt.edu",
});

export async function redirectToSignInPopup() {
  await signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      if (!isVanderbiltDomain(user.email)) {
        logOut();
      }
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

const isVanderbiltDomain = (email) => {
  return email.endsWith("@vanderbilt.edu");
};

export const logOut = () => {
  signOut(auth)
    .then(() => {
      console.log("Successfully logged out.");
    })
    .catch((error) => {
      console.error(error.code);
    });
};

export const fetchCurrentUserDataHome = async () => {
  console.log("database read delayed");
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  await sleep(300);
  if (auth && auth.currentUser && auth.currentUser.email) {
    const userIdRef = doc(db, "userIdMap", auth.currentUser.email);
    const userIdSnap = await getDoc(userIdRef);
    if (!userIdSnap.exists()) {
      return null;
    }
    const userId = userIdSnap.data().userId;
    const userDataRef = doc(db, "users", userId);
    const userDataSnap = await getDoc(userDataRef);
    if (userDataSnap.exists()) {
      return userDataSnap.data();
    }
  }
  return null;
};

export const fetchCurrentUserData = async () => {
  console.log("database read");
  if (auth && auth.currentUser && auth.currentUser.email) {
    const userIdRef = doc(db, "userIdMap", auth.currentUser.email);
    const userIdSnap = await getDoc(userIdRef);
    if (!userIdSnap.exists()) {
      return null;
    }
    const userId = userIdSnap.data().userId;
    const userDataRef = doc(db, "users", userId);
    const userDataSnap = await getDoc(userDataRef);
    if (userDataSnap.exists()) {
      return userDataSnap.data();
    }
  }
  return null;
};
