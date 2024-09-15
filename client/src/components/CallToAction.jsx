import { Button } from 'flowbite-react'
import React from 'react'
import CTA from '../assets/CTA.png'

const CallToAction = () => {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center lg:w-[80%] mx-auto'>
        <div className="flex-1 justify-center flex flex-col">
            <h2 className='text-2xl'>
                Want to see something interesting?
            </h2>
            <p className='text-gray-500 my-4'>
                Checkout this AI image generator project</p>
            <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none w-[70%] self-center'>
                <a href="https://ai-image-ten.vercel.app/" target='_blank' rel='noopener noreferrer'>
                   Go to AI Image Generator
                </a>
            </Button>
        </div>
        <div className="p-6 flex-1 ">
            <img src={CTA} className='border rounded-md' />
        </div>
    </div>
  )
}

export default CallToAction