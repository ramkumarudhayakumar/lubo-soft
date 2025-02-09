import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

export const useFetchCollection = (fbcollection) => {
  const [posts, setPosts] = useState();

  useEffect(() => {
    const collectionRef = collection(db, fbcollection);
    const queryRef = query(collectionRef, orderBy("createdAt", "asc"));
    const unsub = onSnapshot(queryRef, (snapshot) => {
      const results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });
      setPosts(results);
    });
    return () => unsub();
  }, [fbcollection]);
  return () => response();
};
