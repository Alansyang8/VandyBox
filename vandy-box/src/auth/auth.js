import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase";

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    'login_hint': "example@vanderbilt.edu",
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
        }).catch((error) => {
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
}

export const logOut = () => {
    signOut(auth).then(() => {
        console.log("Successfully logged out.");
    }).catch((error) => {
        console.error(error.code);
    })
}