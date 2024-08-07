import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase/config";

export const useFirestore = (fbcollection) => {
  const [error, setError] = useState(null);
  const collectionRef = collection(db, fbcollection);
  const addDocument = async (document) => {
    try {
      await addDoc(collectionRef, {
        ...document,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      setError(err.message);
    }
  };
  const deleteDocument = async (id) => {
    const docRef = doc(db, fbcollection, id);
    try {
      await deleteDoc(docRef);
    } catch (err) {
      setError(err.message);
    }
  };
  const updateDocument = async (id, document) => {
    const docRef = doc(db, fbcollection, id);
    try {
      await updateDoc(docRef, { ...document, createdAt: serverTimestamp() });
    } catch (err) {
      setError(err.message);
    }
  };
  return { addDocument, deleteDocument, updateDocument, error };
};
