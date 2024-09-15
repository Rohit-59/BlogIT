import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState,useEffect,useRef } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { signInFailure,signInStart,removeError,signInSuccess } from '../redux/user/userSlice'
import { useDispatch,useSelector } from 'react-redux'
import OAuth from '../components/OAuth'
import { useLocation } from 'react-router-dom'

import BLOGIT from '../assets/BLOGIT.png'



const SignIn = () => {

  const location = useLocation();
  const prevLocation = useRef(location.pathname);

  const[formData, setFormData] = useState({});
  const {loading, error: errorMessage} = useSelector(state => state.user);
  const dispatch = useDispatch();
const navigate = useNavigate();

const handleChange = (e)=>{
setFormData({...formData, [e.target.id]: e.target.value.trim()})
}

const handleSubmit = async(e)=>{
e.preventDefault();


if(!formData.password || !formData.email){
  return dispatch(signInFailure('Please fill out all the fields'))
}

  try{
      dispatch(signInStart());
    const res = await fetch('https://blogit-jixx.onrender.com/api/auth/signin',{
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if(data.success === false){
      dispatch(signInFailure(data.message));
    }

if(res.ok){
  dispatch(signInSuccess(data));
  navigate('/')
}


  }catch(error){
    dispatch(signInFailure(error.message));
  }


};


useEffect(() => {
  // Check if the page was refreshed
  if (performance.getEntriesByType("navigation")[0].type === "reload") {
    if(errorMessage){
      dispatch(removeError());
    }
  } else if (prevLocation.current !== location.pathname) {
    if(errorMessage){
      dispatch(removeError());
      prevLocation.current = location.pathname;
    }
     // Update the previous path
  }
}, [location]);


  return (
    <div  className='min-h-screen mt-16' >

    <div className='flex flex-col p-3 mx-auto max-w-3xl md:flex-row md:items-center gap-5' > 
    
    <div className='flex-1'>
    <Link to={'/'} className=' font-bold dark:text-white text-4xl' >
      {/* <span className='px-3 py-1 mx-1 rounded-lg text-white bg-gradient-to-r from-indigo-500 to-pink-400' >Blog</span>
      IT */}
      <img src={BLOGIT} className='h-14' />
    </Link>

    <p className='text-sm mt-5'  >You can signup with your email and password or Google Account</p>

    </div>

    <div className='flex-1' >
    <form className='flex flex-col gap-4' onSubmit={handleSubmit}> 

    <div>
      <Label value='Your email' />
      <TextInput 
        type='email'
        placeholder='name@company.com'
        id='email'  onChange={handleChange}
      />

    </div>
    <div>
      <Label value='Your password' />
      <TextInput 
        type='password'
        placeholder='**********'
        id='password' onChange={handleChange}
      />

    </div>

    <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>{
      
      loading ? 
       (<> <Spinner size='sm'/>
      <span className='pl-3' >Loading...</span>
      </>
      ):(
        'Sign In'
        )
    }
     
    </Button>
    <OAuth/>


    </form>

    <div className='flex gap-2 mt-5 text-sm' >
      <span>Don't have an account ? </span>
      <Link to='/sign-up' className='text-blue-500'>
        Sign Up
      </Link>
    </div>

{errorMessage && (
  <Alert className='mt-5' color='failure' >{errorMessage}
  </Alert>
)}


    </div>


    </div>


 </div>
  )
}

export default SignIn