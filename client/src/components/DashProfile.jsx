import { Alert, Button, Modal, ModalBody, ModalHeader, TextInput } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {getDownloadURL, getStorage, uploadBytesResumable,ref} from 'firebase/storage'
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useDispatch } from 'react-redux';
import { updateStart,updateSuccess,updateFailure,deleteFailure,deleteSuccess,deleteStart,signoutSuccess } from '../redux/user/userSlice';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';


const DashProfile = () => {

  const navigate = useNavigate();
    const {currentUser,errorU,loading} = useSelector(state=>state.user);
    const filePickerRef = useRef();
    const [imageFile,setImageFile] = useState(null);
    const [imageFileUrl,setImageFileUrl] = useState(null);
    const [imageFileUploadProgress,setimageFileUploadProgress] = useState(null);
    const [imageFileUploadError,setimageFileUploadError] = useState(null);
    const [imageFileUploading, setimageFileUploading] = useState(false);
const [formData,setFormData]  = useState({});
const dispatch = useDispatch();
const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
const [updateUserError, setUpdateUserError] = useState(null);
const [showModal,setShowModal] = useState(false);

const handleChange= (e)=>{
const file = e.target.files[0];
if(file){
  setImageFile(file);
  setImageFileUrl(URL.createObjectURL(file));
}

}

useEffect(()=>{

  if(imageFile){
    uploadImage();
  }

},[imageFile])

const uploadImage = async ()=>{
setimageFileUploading(true);
  setimageFileUploadError(null);
  const storage = getStorage(app);
  const fileName = new Date().getTime() + imageFile.name;
  const storageRef = ref(storage,fileName);
  const uploadTask = uploadBytesResumable(storageRef,imageFile);
  uploadTask.on(
    'state_changed',
    (snapshot)=>{
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
      setimageFileUploadProgress(progress.toFixed(0));
    },
    (error)=>{
 setimageFileUploadError('Could not upload image (File must be less than 2 MB)')
 setimageFileUploadProgress(null);
 setImageFile(null);
 setImageFileUrl(null);
 setimageFileUploading(false);
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
        setImageFileUrl(downloadURL);
        setFormData({...formData, profilePicture:downloadURL});
        setimageFileUploading(false);
      })
    }
  )
}

const handleChangeV = (e)=>{
  setFormData({...formData, [e.target.id] : e.target.value});
}


const handleSubmit = async(e)=>{
e.preventDefault();

setUpdateUserError(null);
setUpdateUserSuccess(null);

if(Object.keys(formData).length === 0){
 setUpdateUserError('No changes made');
  return;
}

if(imageFileUploading){
  setUpdateUserError('Please wait for image to upload')
  return;
}


try {
  dispatch(updateStart());
  const res = await fetch(`/api/user/update/${currentUser._id}`,{
    method:'PUT',
    headers:{
      'Content-Type' : 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  if(!res.ok){
    dispatch(updateFailure(data.message));
    setUpdateUserError(data.message);
  }else{
    dispatch(updateSuccess(data));
    setUpdateUserSuccess("User's profile updated succesfully")
  }
  
} catch (error) {
  dispatch(updateFailure(error.message))
  setUpdateUserError(error.message);
}

}

const handleDeleteUser = async()=>{

setShowModal(false);
try {
  dispatch(deleteStart());

  const res = await fetch(`/api/user/delete/${currentUser._id}`,{
    method: 'DELETE',
  });

  const data = await res.json();

  if(!res.ok){
    dispatch(deleteFailure(data.message));
  }else{
    dispatch(deleteSuccess(data));
    // navigate('/')

  }
  
} catch (error) {
  dispatch(deleteFailure(error.message))
}




}

const handleSignout = async ()=>{
try {
  const res = await fetch('/api/user/signout',{
    method: 'POST',
  });

  const data = await res.json();
  
if(!res.ok){
  console.log(data.message)
}else{
dispatch(signoutSuccess());
// navigate('/')
}

} catch (error) {
  console.log(error);
}


}


  return (
    <div className='max-w-lg mx-auto p-3 w-full'  >
<h1 className='my-7 text-center font-semibold text-3xl'  > Profile</h1>
<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
<input type='file' accept='image/*' onChange={handleChange} ref={filePickerRef} hidden/>
<div className=' relative overflow-hidden rounded-full shadow-md cursor-pointer w-32 h-32 self-center ' onClick={()=> filePickerRef.current.click()}  >

{imageFileUploadProgress && (
  <CircularProgressbar value={imageFileUploadProgress || 0} text={`${imageFileUploadProgress}%`}  strokeWidth={5}
    styles={{
      root:{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
      },
      path:{
        stroke: `rgba(62,152,199, ${
        imageFileUploadProgress/100})`,
      }
    }}
  />
)}


    <img 
    src={imageFileUrl || currentUser.profilePicture} alt="user" className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${imageFileUploadProgress && imageFileUploadProgress<100 && 'opacity-60'}`} />
</div>
{imageFileUploadError && 
  <Alert color='failure'>
  {imageFileUploadError}
</Alert>}


<TextInput type='username' id='username' placeholder='username'
defaultValue={currentUser.username} onChange={handleChangeV}  />
<TextInput type='email' id='email' placeholder='email'
defaultValue={currentUser.email} onChange={handleChangeV}  />
<TextInput type='password' id='password'
defaultValue='**********' onChange={handleChangeV}  />

<Button type='submit' gradientDuoTone='purpleToBlue' outline disabled={loading || imageFileUploading} > {loading ? 'Loading...' :'Update'} </Button>

{currentUser.isAdmin && (
  <Link to={'/create-post'} >
<Button type='button'
gradientDuoTone='purpleToPink'
className='w-full'  >
Create a post
</Button>
</Link>
)}



</form>
<div  className='text-red-500 flex justify-between mt-5'  >
<span onClick={()=>setShowModal(true)} className='cursor-pointer' >Delete Account </span>
<span onClick={handleSignout}   className='cursor-pointer' >Sign Out</span>
</div>
{updateUserSuccess && (
  <Alert color='success' className='mt-5'>
    {updateUserSuccess}
  </Alert>
)}
{updateUserError && (
  <Alert color='failure' className='mt-5'>
    {updateUserError}
  </Alert>
)}

{errorU && (
  <Alert color='failure' className='mt-5'>
    {errorU}
  </Alert>
)}



<Modal show={showModal}
onClose={()=>setShowModal(false)} 
popup size='md'
>
<Modal.Header/>
<Modal.Body>
<div className='text-center' >
<HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
</div>
<h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'  >Are you sure you want to delete your account?</h3>
<div className='flex justify-center gap-4 mt-5' >
<Button onClick={handleDeleteUser}
color='failure' >
Yes, I'm sure
</Button>
<Button onClick={()=>setShowModal(false)}
color='gray' >
No, cancel
</Button>
</div>
</Modal.Body>
</Modal>

    </div>
  )
}

export default DashProfile