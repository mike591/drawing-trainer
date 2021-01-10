import { useState, useEffect, useRef } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export const useDrawings = () => {
  const db = firebase.firestore();
  const drawingsRef = db.collection("drawings");

  const [drawings, setDrawings] = useState([]);
  const [drawing, setDrawing] = useState([]);

  const unsubscribeDrawingsRef = useRef(null);
  const unsubscribeDrawingRef = useRef(null);

  useEffect(() => {
    return () => {
      unsubscribeDrawingsRef.current && unsubscribeDrawingsRef.current();
      unsubscribeDrawingRef.current && unsubscribeDrawingRef.current();
    };
  });

  const subscribeToDrawings = (user) => {
    unsubscribeDrawingsRef.current = drawingsRef
      .where("uid", "==", user.uid)
      .where("isDeleted", "==", false)
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        setDrawings(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });

    return drawings;
  };

  const subscribeToDrawing = (drawingId) => {
    unsubscribeDrawingRef.current = drawingsRef
      .doc(drawingId)
      .onSnapshot((snapshot) => {
        setDrawing(snapshot.data());
      });

    return drawing;
  };

  const saveDrawing = async ({ blob, adjective, noun, user }) => {
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(uuidv4());

    const snapshot = await fileRef.put(blob);
    const url = await snapshot.ref.getDownloadURL();
    return await drawingsRef.add({
      imageUrl: url,
      adjective,
      noun,
      isDeleted: false,
      uid: user.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  const deleteDrawing = (id) => {
    drawingsRef.doc(id).update({
      isDeleted: true,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  const getDrawingsForReview = () => {
    return drawingsRef
      .limit(10)
      .get()
      .then((snapshot) => {
        return snapshot.docs.map((doc) => doc.data());
      });
  };

  return {
    saveDrawing,
    deleteDrawing,
    subscribeToDrawings,
    subscribeToDrawing,
    getDrawingsForReview,
  };
};
