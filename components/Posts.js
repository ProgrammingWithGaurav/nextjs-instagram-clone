import Post from "./Post";

const posts = [
    {
        id: '123',
        username: 'Gaurav',
        userImg: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/725.jpg',
        img: ' https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/335.jpg',
        caption: 'This is the best post ever created',
    }
]
function Posts() {
    return <div>
        {posts.map(post => (
            <Post key={post.id} userImg={post.userImg} caption={post.caption} img={post.img} username={post.username} />
        ))
        }
    </div>;
}

export default Posts;
