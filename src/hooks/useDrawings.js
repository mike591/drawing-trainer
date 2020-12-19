import { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import { v4 as uuidv4 } from "uuid";

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

  const saveDrawing = async ({ blob, adjective, noun }) => {
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(uuidv4());

    const snapshot = await fileRef.put(blob);
    const url = await snapshot.ref.getDownloadURL();
    return await db.collection("drawings").add({
      imageUrl: url,
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
