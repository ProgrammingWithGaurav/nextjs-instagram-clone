import Post from "./Post";
import { useState, useEffect } from "react";
import { onSnapshot, orderBy, query, collection } from "firebase/firestore";
import { db } from "../firebase";

const posts = [
  {
    id: "123",
    username: "Gaurav",
    userImg:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/725.jpg",
    img: " https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/335.jpg",
    caption: "This is the best post ever created",
  },
];
function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "instagram_nextjs_posts"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          setPosts(snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })));
        }
      ),
    [db]
  );
  console.log(posts)
  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          userImg={post.profileImg}
          caption={post.caption}
          img={post.image}
          username={post.username}
        />
      ))}
    </div>
  );
}

export default Posts;
