import React, { useEffect, useState } from 'react'
import {Link,useParams} from 'react-router-dom';
import { Button, Spinner } from 'flowbite-react' 
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';



const PostPage = () => {

  const {postSlug} = useParams(); 
 const [loading,setLoading] = useState(false);
 const [error,setError] = useState(false);
 const [post,setPost] = useState(null);
 const [recentPosts, setRecentPosts] = useState(null);

 console.log(post);

  useEffect(()=>{
const fetchPost = async()=>{

  try {
    setLoading(true);
    const res = await fetch(`https://blogit-jixx.onrender.com/api/post/getposts?slug=${postSlug}`);
    const data = await res.json();
    console.log("1");

     if(!res.ok){
      setError(true);
      setLoading(false);
      console.log("2");
      return;
     }
     if(res.ok){
      setPost(data.posts[0]);
      console.log("3");
      setLoading(false);
      setError(false);
     }


  } catch (error) {
    setLoading(false);
      setError(true);
  }
}

fetchPost();
  },[postSlug])


  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`https://blogit-jixx.onrender.com/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);


  if(loading) return (
    <div className='flex justify-center items-center min-h-screen' >
      <Spinner size='xl'/>
    </div>
  ) 


  return (
    <main className= ' flex flex-col max-w-6xl mx-auto min-h-screen p-3' >
      <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl' >{post && post.title}</h1>

<Link to={`/search?category=${post && post.category}`}  className='self-center mt-5' >
  <Button color='gray' pill size='xs' >{post && post.category}</Button>
</Link>
<img src={post && post.image} alt={post && post.title}
 className=' mt-10 p-3 max-h-[600px] w-full object-cover' />


<div className='flex justify-between p-3 border-b border-slate-500 mx-auto max-w-3xl  w-full text-xs'>
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className='italic'>
          {post && (post.content.length / 600).toFixed(0)} mins read
        </span>
      </div>

      <div
        className='p-3 pt-12 max-w-4xl mx-auto w-full post-content'
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>

<div className='max-w-4xl mx-auto w-full pt-14'>
        <CallToAction />
      </div>

      {post && <CommentSection postId={post._id} />}

      <div className='flex flex-col justify-center items-center mb-5'>
        <h1 className='text-xl mt-5'>Recent articles</h1>
        <div className='flex flex-wrap gap-5 mt-5 justify-center'>
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>


    </main>
  )
}

export default PostPage