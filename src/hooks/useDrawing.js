import { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

export const useDrawing = (drawingId) => {
  const [drawing, setDrawing] = useState([]);
  const db = firebase.firestore();

  useEffect(() => {
    if (drawingId) {
      const unsubscribe = db
        .collection("drawings")
        .doc(drawingId)
        .onSnapshot((snapshot) => {
          setDrawing(snapshot.data());
        });

      return unsubscribe;
    }
  }, [db, drawingId]);

  return { drawing };
};
