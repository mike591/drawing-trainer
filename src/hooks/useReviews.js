import React from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

export const useReviews = () => {
  const db = firebase.firestore();

  const [reviews, setReviews] = React.useState();
  const unsubscribeReviewsRef = React.useRef(null);

  React.useEffect(() => {
    return () => {
      unsubscribeReviewsRef.current && unsubscribeReviewsRef.current();
    };
  });

  const subscribeToReviews = () => {
    unsubscribeReviewsRef.current = db
      .collectionGroup("reviews")
      .onSnapshot((snapshot) => {
        console.log(snapshot.docs.map((doc) => doc.data()));
      });

    return reviews;
  };

  const addReview = ({ drawingId, userId, didGuessCorrect }) => {
    db.collection("drawings")
      .doc(drawingId)
      .collection("reviews")
      .doc(userId)
      .set({
        didGuessCorrect,
        drawingId,
        userId,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
  };

  return { subscribeToReviews, addReview };
};
