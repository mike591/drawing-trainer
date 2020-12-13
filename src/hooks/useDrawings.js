import { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

export const useDrawings = (user) => {
  const [drawings, setDrawings] = useState([]);
  const db = firebase.firestore();

  useEffect(() => {
    if (user) {
      const unsubscribe = db
        .collection("drawings")
        .where("uid", "==", user.uid)
        .where("isDeleted", "==", false)
        .orderBy("createdAt")
        .onSnapshot((snapshot) => {
          setDrawings(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
        });

      return unsubscribe;
    }
  }, [db, user]);

  const saveDrawing = ({ blob, adjective, noun }) => {
    db.collection("drawings").add({
      image: blob,
      adjective,
      noun,
      isDeleted: false,
      uid: user.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  return { drawings, saveDrawing };
};
