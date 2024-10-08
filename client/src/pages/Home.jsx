import React from 'react'
import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import { Spinner } from 'flowbite-react';

const Home = () => {

  const [posts, setPosts] = useState([]);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('https://blogit-jixx.onrender.com/api/post/getPosts',{
        credentials: 'include',
      });
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);


  return (
    <div>
      <div className='flex flex-col gap-6 p-20 pb-14 px-3 max-w-6xl mx-auto '>
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to my Blog</h1>
        <p className='text-gray-500 text-xs sm:text-sm'>
          Here you'll find a variety of articles on topics such as anime, technology, TV shows ,movies, videogames, sports and coding and many more.
        </p>
        <Link
          to='/search'
          className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'
        >
          View all posts
        </Link>
      </div>

      <div className='p-3 '>
        <CallToAction />
      </div>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 ? (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='flex flex-wrap gap-4 justify-center'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              View all posts
            </Link>
          </div>
        ):( <div  className='flex items-center justify-center pt-6' ><Spinner  size='xl' /></div>)}
      </div>
    </div>
  );
}

export default Home