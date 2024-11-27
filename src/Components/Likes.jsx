import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { Heart } from 'lucide-react';
import {
    checkIfUserLikedPost,
    addLikeToUser,
    removeLikeFromUser,
    updateJourneyLikes
  } from "../Config/firestore";

const LikeButton = ({ obj }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(obj.likes || 0);
  const [isLoading, setIsLoading] = useState(true);

  // Check initial like status when component mounts
  useEffect(() => {
    const checkInitialLikeStatus = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          const likeStatus = await checkIfUserLikedPost(obj.id, user.email);
          setIsLiked(likeStatus);
        }
      } catch (error) {
        console.error("Error checking initial like status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkInitialLikeStatus();
  }, [obj.uid]);

  const handleLike = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      
      if (!user) {
        console.error("User must be logged in to like posts");
        return;
      }

      // Optimistically update UI
      const newLikeCount = isLiked ? likes - 1 : likes + 1;
      setIsLiked(!isLiked);
      setLikes(newLikeCount);

      if (isLiked) {
        // Unlike the post
        await removeLikeFromUser(obj.id, user.email);
        await updateJourneyLikes(obj.id, newLikeCount);
      } else {
        // Like the post
        const likeStatus = await checkIfUserLikedPost(obj.uid, user.email);
        if (!likeStatus) {
          await addLikeToUser(obj.id, obj.id, obj.userName, user.email);
          await updateJourneyLikes(obj.id, newLikeCount);
        }
      }
    } catch (error) {
      console.error("Error updating likes:", error);
      // Revert the optimistic update if the operation fails
      setIsLiked(!isLiked);
      setLikes(isLiked ? likes : likes - 1);
    }
  };

  if (isLoading) {
    return <div className="flex items-center gap-2">
      <Heart className="h-6 w-6 text-gray-300 animate-pulse" />
      <span>{likes}</span>
    </div>;
  }

  return (
    <div className="flex items-center gap-2">
      <Heart
        className={`h-6 w-6 cursor-pointer transition-colors duration-200 ${
          isLiked ? 'text-red-500 fill-current' : 'text-gray-500'
        }`}
        onClick={handleLike}
      />
      <span>{likes}</span>
    </div>
  );
};

export default LikeButton;