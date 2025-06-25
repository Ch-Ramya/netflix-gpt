// utils/firestore.js
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

// Get favourites of a user
export const getUserFavourites = async (userId) => {
  const userRef = doc(db, "favourites", userId);
  const docSnap = await getDoc(userRef);
  return docSnap.exists() ? docSnap.data().items : [];
};

// Save favourites
export const saveUserFavourites = async (userId, items) => {
  const userRef = doc(db, "favourites", userId);
  await setDoc(userRef, { items }, { merge: true });
};
