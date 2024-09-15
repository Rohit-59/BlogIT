import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
// import { removeError } from '../redux/user/userSlice'
import OAuth from '../components/OAuth';
import BLOGIT from '../assets/BLOGIT.png'
const SignUp = () => {

  const[formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading,setLoading] = useState(false);
const navigate = useNavigate();

const handleChange = (e)=>{
setFormData({...formData, [e.target.id]: e.target.value.trim()})
}

const handleSubmit = async(e)=>{
e.preventDefault();


if(!formData.username || !formData.password || !formData.email){
  return setErrorMessage('Please fill out all the fields')
}

  try{
   setLoading(true);
   setErrorMessage(null);
    const res = await fetch('https://blogit-jixx.onrender.com/api/auth/signup',{
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if(data.success === false){
      return setErrorMessage(data.message);
    }
setLoading(false);
if(res.ok){
  navigate('/sign-in')
}


  }catch(error){
setErrorMessage(error);
  }


};


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
      <Label value='Your username' />
      <TextInput 
        type='text'
        placeholder='Username'
        id='username' onChange={handleChange}
      />

    </div>

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
        placeholder='Password'
        id='password' onChange={handleChange}
      />

    </div>

    <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>{
      
      loading ? 
       (<> <Spinner size='sm'/>
      <span className='pl-3' >Loading...</span>
      </>
      ):(
        'Sign Up'
        )
    }
     
    </Button>
    <OAuth/>


    </form>

    <div className='flex gap-2 mt-5 text-sm' >
      <span>Already have an account ? </span>
      <Link to='/sign-in' className='text-blue-500'>
        Sign In
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

export default SignUp