import {Sidebar} from 'flowbite-react'
import {HiUser, HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiAnnotation, HiChartPie} from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signoutSuccess } from '../redux/user/userSlice'
import { useSelector } from 'react-redux'

const DashSidebar = () => {

    const location = useLocation();
    const [tab,setTab] = useState('');
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const {currentUser} = useSelector(state=>state.user)
   
     useEffect(()=>{
       const urlParams = new URLSearchParams(location.search);
       const tabFromtURL = urlParams.get('tab');
   if(tabFromtURL){
     setTab(tabFromtURL);
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


  return (
    <Sidebar className='w-full md:h-5/6'>
        <Sidebar.Items>
<Sidebar.ItemGroup className='flex flex-col gap-1' >

{currentUser && currentUser.isAdmin &&  (<Link to='/dashboard?tab=dash'  >
    <Sidebar.Item active={tab === 'dash' || !tab} icon={HiChartPie} 
    as='div' >Dashboard</Sidebar.Item>
    </Link> )}
    



<Link to='/dashboard?tab=profile'  >
    <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={currentUser.isAdmin ?'Admin':'User'} lablecolor='dark'
    as='div' >Profile</Sidebar.Item>
    </Link>
    
{currentUser.isAdmin &&  (<Link to='/dashboard?tab=posts'  >
    <Sidebar.Item active={tab === 'posts'} icon={HiDocumentText} 
    as='div' >Posts</Sidebar.Item>
    </Link> )}

    {currentUser.isAdmin &&  (<Link to='/dashboard?tab=users'  >
    <Sidebar.Item active={tab === 'users'} icon={HiOutlineUserGroup} 
    as='div' >Users</Sidebar.Item>
    </Link> )}

    {currentUser.isAdmin &&  (<Link to='/dashboard?tab=comments'  >
    <Sidebar.Item active={tab === 'comments'} icon={HiAnnotation} 
    as='div' >Comments</Sidebar.Item>
    </Link> )}
    

    

    <Sidebar.Item  icon={HiArrowSmRight} className='cursor-pointer'  onClick={handleSignout} >Sign Out</Sidebar.Item>
</Sidebar.ItemGroup>

        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar