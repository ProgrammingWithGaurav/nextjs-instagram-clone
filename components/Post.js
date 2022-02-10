import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  PaperAirplaneIcon,
  HeartIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { addDoc, collection, serverTimestamp, orderBy, onSnapshot, query, setDoc, doc, deleteDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import Moment from "react-moment";

function Post({ id, username, userImg, img, caption }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => onSnapshot(
    query(
      collection(db, 'instagram_nextjs_posts', id, 'comments'),
      orderBy('timestamp', 'desc')
    )
    , snapshot => setComments(snapshot.docs.map(doc => ({
      id: doc.id, ...doc.data()
    })))
  ), [db, id])

  useEffect(() => onSnapshot(
      collection(db, 'instagram_nextjs_posts', id, 'likes'),snapshot => setLikes(snapshot.docs.map(doc => ({
      id: doc.id, ...doc.data()
    })))
  ), [db, id])

  const sendComment = async (e) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "instagram_nextjs_posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
    });

  };

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "instagram_nextjs_posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "instagram_nextjs_posts", id, "likes", session.user.uid), {
        username: session.user.username,
        id: session.user.uid,
      })
    }
  }

  useEffect(() => {
    setHasLiked(
      likes.findIndex(like => like.id === session?.user?.uid)!== -1)

    console.log(hasLiked)
  }, [likes])

  return (
    <div className="my-7 rounded-sm border bg-white ">
      {/* Header */}
      <div className="flex items-center p-5">
        <img
          src={userImg}
          alt=""
          className="mr-3 h-12 w-12 rounded-full border object-contain p-1"
        />
        <p className="flex-1 font-bold">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>
      {/* img */}
      <img src={img} alt="" className="h-64 w-full object-cover" />
      {session && (
        <>
          {/* buttons */}
          <div className="flex justify-between px-4 pt-4">
            <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFilled className="btn text-red-500" onClick={likePost} />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
              )}
              <ChatIcon className="btn" />
              <PaperAirplaneIcon className="btn rotate-45" />
            </div>
            <BookmarkIcon className="btn" />
          </div>
        </>
      )}
      {/* caption */}
      <p className="truncate p-5">
        {likes.length>0 && (
          <p className='font-bold mb-1'>{likes.length} likes</p>
        )}
        <span className="mr-1 font-bold">{username} </span>
        {caption}
      </p>
      {/* comments */}
      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map(comment => (
            <div className="flex items-center space-x-2 mb-3" key={comment.id}>
              <img
                src={comment.profileImg}
                alt=""
                className="h-7 rounded-full"
              />
              <p className="text-sm flex-1"><span className="font-bold">{comment.username} </span>{comment.comment}</p>
              <Moment fromNow className="text-sm pr-5">
                {comment.timestamp?.toDate()}
              </Moment>
            </div>
          ))}

        </div>
      )}

      {/* input box */}
      <form className="flex items-center p-4">
        <EmojiHappyIcon className="h-7" />
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          type="text"
          className="flex-1 border-none outline-none focus:ring-0"
        />
        <button
          type="submit"
          onClick={sendComment}
          disabled={!comment.trim()}
          className="font-semibold text-blue-400"
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default Post;
