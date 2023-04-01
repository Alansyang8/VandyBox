import { arrayUnion, updateDoc, setDoc, doc, arrayRemove } from "firebase/firestore";
import { db } from "../firebase";

// Modifies user's name
export async function modifyName(userId, name) {
    const docRef = doc(db, "users", userId);
    await setDoc(docRef, {
        name: name,
    }, { merge: true });
}

// Modifies user's status message
export async function modifyStatusMsg(userId, msg) {
    const docRef = doc(db, "users", userId);
    await setDoc(docRef, {
        statusMsg: msg,
    }, { merge: true });
}

// Modifies user's additional info
export async function modifyAddInfo(userId, info) {
    const docRef = doc(db, "users", userId);
    await setDoc(docRef, {
        additionalInfo: info,
    }, { merge: true });
}

// Add a movie to favorites collection
export async function addToFavorites(userId, movieID) {
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, {
        favorites: arrayUnion(movieID),
    });
}

// Delete a movie from favorites collection
export async function deleteFromFavorites(userId, movieID) {
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, {
        favorites: arrayRemove(movieID),
    });
}

// Add a friend to friends list
export async function addToFriends(userId, name) {
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, {
        friends: arrayUnion(name),
    });
}

// Delete a friend from friends list
export async function deleteFromFriends(userId, name) {
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, {
        friends: arrayRemove(name),
    });
}

// Add a movie to to-watch collection
export async function addToToWatch(userId, movieID) {
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, {
        toWatch: arrayUnion(movieID),
    });
}

// Delete a movie from to-watch collection
export async function deleteFromToWatch(userId, movieID) {
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, {
        toWatch: arrayRemove(movieID),
    });
}

export async function addToToSeen(userId, movieID) {
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, {
        seen: arrayUnion(movieID),
    });
}

// Delete a movie from to-watch collection
export async function deleteFromSeen(userId, movieID) {
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, {
        seen: arrayRemove(movieID),
    });
}

export async function addFriend(userId, id) {
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, {
        friends: arrayUnion(id),
    });
}

export async function deleteFriend(userId, id) {
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, {
        friends: arrayRemove(id),
    });
}
