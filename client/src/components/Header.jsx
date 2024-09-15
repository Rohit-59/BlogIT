import { Avatar, Button, Dropdown, Navbar, TextInput, theme } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon,FaSun} from 'react-icons/fa'
import {useSelector,useDispatch} from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice'
import { signoutSuccess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'
import BLOGIT from '../assets/BLOGIT.png'

const Header = () => {

  const {currentUser} = useSelector(state => state.user)
  const {theme} = useSelector(state => state.theme)
const path = useLocation().pathname;
const location = useLocation();
const dispatch = useDispatch();
const navigate = useNavigate();
const [searchTerm,setSearchTerm] = useState('');

useEffect(()=>{

  const urlParams = new URLSearchParams(location.search);
  const searchTermFromUrl = urlParams.get('searchTerm');
  if(searchTermFromUrl){
    setSearchTerm(searchTermFromUrl);
  }


},[location.search])

const handleSignout = async ()=>{
  try {
    const res = await fetch('https://blogit-jixx.onrender.com/api/user/signout',{
      method: 'POST',
      credentials: 'include',
    });
  
    const data = await res.json();
    
  if(!res.ok){
    console.log(data.message)
  }else{
  dispatch(signoutSuccess());
  navigate('/')
  }
  
  } catch (error) {
    console.log(error);
  }
  
  
  }

  const handleSubmit =  (e)=>{
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    if (searchTerm) {
      urlParams.set('searchTerm', searchTerm);
    } 
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`)
  }



  return (
    <Navbar className='border-b-2'  >
    <Link to={'/'} className='  self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white' >
      {/* <span className='px-3 py-1 mx-1 rounded-lg text-white bg-gradient-to-r from-indigo-500 to-pink-400' >Blog</span>
      IT */}
      <img src={BLOGIT} className='h-9' />
    </Link>

    <form onSubmit={handleSubmit}>
      {/* <TextInput
type='text'
placeholder='Search...'
rightIcon={AiOutlineSearch}
className='hidden lg:inline'
value={searchTerm}
onChange={(e)=>setSearchTerm(e.target.value)}
      /> */}
      <div className='relative flex items-center'>

      <TextInput
    type='text'
    placeholder='Search...'
    className='hidden lg:inline'
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <button
    type='button'
    className='hidden lg:inline absolute right-0 pr-3'
    onClick={ handleSubmit}
  >
    <AiOutlineSearch />
  </button>
</div>



    </form>
    
    <Link className='float-left'  to={'/search'}>
    <Button className='w-12 h-10 lg:hidden' color='gray' pill  >
    <AiOutlineSearch className='cursor-pointer'  />  
    </Button>
</Link>

<div className='flex gap-2 md:order-2' >


  <Button  className='w-12 h-10 hidden sm:inline ' color='gray' pill onClick={()=>dispatch(toggleTheme())}
    >
     {theme === 'light' ? <FaSun/> :<FaMoon/>} 
    </Button>


{currentUser ? (
  <Dropdown
    arrowIcon={false}
    inline
    label = {
      <Avatar
      alt='user'
      img={currentUser.profilePicture}
rounded
      />
    }
  >
<Dropdown.Header>
  <span className='block text-sm' >@{currentUser.username}</span>
  <span className='block text-sm font-medium truncate' >{currentUser.email}</span>
</Dropdown.Header>
<Link to={'/dashboard?tab=profile'} >
  <Dropdown.Item>Profile</Dropdown.Item>
</Link>
<Dropdown.Divider/>
<Dropdown.Item  onClick={handleSignout} >Sign Out</Dropdown.Item>


  </Dropdown>
):(
    <Link to={'/sign-in'}>
    <Button gradientDuoTone='purpleToBlue' outline >Sign In</Button>
    </Link>)}





   <Navbar.Toggle/>

    </div>

     <Navbar.Collapse>
        <Navbar.Link  active={path==='/'} as={'div'}  >
          <Link to={'/'}  >
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path==='/about'} as={'div'}  >
          <Link to={'/about'}   >
            About
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path==='/contact'} as={'div'}  >
          <Link to={'/contact'}  >
            Contact
          </Link>
        </Navbar.Link>

   </Navbar.Collapse> 


    </Navbar>
    
    
  )
}

export default Header