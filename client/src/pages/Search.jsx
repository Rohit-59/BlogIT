import { Button, Select, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';

const Search = () => {

const [sidebarData,setSidebarData] = useState({
    searchTerm:'',
    sort:'desc',
    category:'uncategorized'
});

const location = useLocation();
const [posts,setPosts] = useState([]);
const [loading,setLoading] = useState(false);
const [showMore,setShowMore] = useState(false);
const navigate = useNavigate();

useEffect(() => {
  console.log("Called effect here")
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl = urlParams.get('category');
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }
    const fetchPosts = async () => {
        setLoading(true);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/post/getposts?${searchQuery}`);
        if (!res.ok) {
          setLoading(false);
          return;
        }
        if (res.ok) {
          const data = await res.json();
          setPosts(data.posts);
          setLoading(false);
          if (data.posts.length === 9) {
            setShowMore(true);
          } else {
            setShowMore(false);
          }
        }
      };
      fetchPosts();
    }, [location.search]);


    const handleChange = (e) => {
        if (e.target.id === 'searchTerm') {
          const searchData = e.target.value || '';
          setSidebarData({ ...sidebarData, searchTerm: searchData });
        }
        if (e.target.id === 'sort') {
          const order = e.target.value || 'desc';
          setSidebarData({ ...sidebarData, sort: order });
        }
        if (e.target.id === 'category') {
          const category = e.target.value || 'uncategorized';
          setSidebarData({ ...sidebarData, category });
        }
      };

      const handleShowMore = async () => {
        const numberOfPosts = posts.length;
        const startIndex = numberOfPosts;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/post/getposts?${searchQuery}`);
        if (!res.ok) {
          return;
        }
        if (res.ok) {
          const data = await res.json();
          setPosts([...posts, ...data.posts]);
          if (data.posts.length === 9) {
            setShowMore(true);
          } else {
            setShowMore(false);
          }
        }
      };


      const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        if (sidebarData.searchTerm) {
          urlParams.set('searchTerm', sidebarData.searchTerm);
        } else {
          urlParams.delete('searchTerm'); 
        }
        urlParams.set('sort', sidebarData.sort);
        urlParams.set('category', sidebarData.category);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
      };


      const handleRemove = ()=>{

        try {
            
            setSidebarData({
                ...sidebarData,
                searchTerm: '',
                sort: 'desc',
                category: 'uncategorized',
              });

              navigate('/search');

        } catch (error) {
            
        }

      }

  return (
    <div className='flex flex-col md:flex-row' >
        <div className='p-7 border-b md:border-r md:min-h-screen border-gray-500' >
            <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
                <div  className='flex items-center gap-2'>
                    <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                    <TextInput placeholder='Search...'
                    id='searchTerm' type='text'
                    value={sidebarData.searchTerm || '' } 
                        onChange={handleChange}
                    />
                </div>

<div className='flex gap-2 items-center' >
<label className=' font-semibold'>Sort:</label>
<Select onChange={handleChange} value={sidebarData.sort || 'desc'} id='sort'>
    <option value='desc' >Latest</option>
    <option value='asc' >Oldest</option>
</Select>
</div>


<div className='flex gap-2 items-center' >
<label className=' font-semibold'>Category:</label>
<Select onChange={handleChange} value={sidebarData.category || 'uncategorized'} id='category'>
<option value='uncategorized'>Uncategorized</option>
        <option value='coding'>Coding</option>
        <option value='tech'>Technology</option>
        <option value='anime'>Anime</option>
        <option value='movies'>Movies</option>
        <option value='tv'>TV</option>
        <option value='games'>Videogames</option>
        <option value='sports'>Sports</option>
</Select>
</div>
<Button outline type='submit' gradientDuoTone='purpleToPink' >Apply Filters</Button>

<Button outline  onClick={handleRemove} gradientDuoTone='pinkToOrange' >Remove Filters</Button>




            </form>
        </div>

<div className='w-full' >
    <h1  className='text-3xl font-semibold sm:border-b p-3 mt-5 border-gray-500' >Post results</h1>
    <div className='flex flex-wrap gap-4 p-7' >
        {
            !loading && posts.length ===0 && (<p className='text-xl text-gray-500' >No posts found.</p>
        )}
        {loading && <p className='text-xl text-gray-500' >
            Loading...
        </p>}
        {!loading && posts && posts.map((post)=>(
            <PostCard key={post._id} post={post} />
        )) }
        {showMore && (
            <button
              onClick={handleShowMore}
              className='text-teal-500 text-lg hover:underline p-7 w-full'
            >
              Show More
            </button>
          )}
    </div>
</div>




    </div>
  )
}

export default Search