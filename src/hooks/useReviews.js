import React from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

export const useReviews = () => {
  const db = firebase.firestore();

  const [reviews, setReviews] = React.useState({});
  const unsubscribeReviewsRef = React.useRef(null);

  React.useEffect(() => {
    return () => {
      unsubscribeReviewsRef.current && unsubscribeReviewsRef.current();
    };
  });

  const getUserReviews = async ({ user }) => {
    return await db
      .collectionGroup("reviews")
      .get()
      .then((querySnapshot) => {
        const userReviews = [];
        querySnapshot.forEach((doc) => {
          if (doc.id === user.uid) {
            userReviews.push(doc.data());
          }
        });
        return userReviews;
      });
  };

  const subscribeToAllReviews = () => {
    unsubscribeReviewsRef.current = db
      .collectionGroup("reviews")
      .onSnapshot((snapshot) => {
        const _reviews = {};
        snapshot.docs.forEach((doc) => {
          const drawingId = doc.ref.parent.parent.id;
          _reviews[drawingId] = _reviews[drawingId] || [];
          _reviews[drawingId].push(doc.data());
        });
        setReviews(_reviews);
      });

    return reviews;
  };

  const addReview = async ({ drawingId, userId, didGuessCorrect }) => {
    await db
      .collection("drawings")
      .doc(drawingId)
      .collection("reviews")
      .doc(userId)
      .set({
        didGuessCorrect,
        drawingId,
        uid: userId,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
  };

  return { subscribeToAllReviews, addReview, getUserReviews };
};
