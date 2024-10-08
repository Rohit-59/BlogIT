import { app } from '../firebase';
import { Button } from 'flowbite-react'
import React from 'react'
import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth'
import { AiFillGoogleCircle } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {

  const auth = getAuth(app);
const dispatch = useDispatch();
const navigate = useNavigate();

    const handleGoogleClick =async ()=>{
        const provider = new GoogleAuthProvider()
      provider.setCustomParameters({prompt:'select_account'})
try {
  const resultFromGoogle = await signInWithPopup(auth,provider)
  console.log(resultFromGoogle);


  const res = await fetch('https://blogit-jixx.onrender.com/api/auth/google',{
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      name:resultFromGoogle.user.displayName,
      email:resultFromGoogle.user.email,
      googlePhotoURL: resultFromGoogle.user.photoURL,
    }),
    credentials: 'include',
  });

  const data = await res.json();

if(res.ok){
dispatch(signInSuccess(data));
navigate('/')
}








} catch (error) {
  console.log(error);
}
    }


  return (
    <Button outline gradientDuoTone='pinkToOrange' onClick={handleGoogleClick}>
    <AiFillGoogleCircle className='h-6 w-6 mr-2'/>
    Continue with Google</Button>
  )
}

export default OAuth