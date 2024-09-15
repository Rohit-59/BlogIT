import { Footer } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
import {BsFacebook,BsInstagram,BsTwitterX,BsGithub,BsLinkedin} from 'react-icons/bs'
import BLOGIT from '../assets/BLOGIT.png'


const FooterC = () => {
  return (
    <Footer container className='border border-t-[4px] border-teal-500'  >

    <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1' >
            <div className='mt-5'>
            <Link to={'/'} className='  self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white' >
            <img src={BLOGIT} className='h-9' />
    </Link>
</div>

<div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6' >
<div>
<Footer.Title title='About'/>
<Footer.LinkGroup col>
    <Footer.Link href='https://my-portfolio-roan-nine.vercel.app/' target='_blank'
    rel='noopener noreferer'>
        Portfolio
    </Footer.Link>
    <Footer.Link href='/about' target='_blank'
    rel='noopener noreferer'>
        BlogIT
    </Footer.Link>
</Footer.LinkGroup>

</div>



<div>
<Footer.Title title='Follow Me'/>
<Footer.LinkGroup col>
    <Footer.Link href='https://github.com/Rohit-59' target='_blank'
    rel='noopener noreferer'>
        Github
    </Footer.Link>
    <Footer.Link href='https://www.linkedin.com/in/rohit-raghuwanshi-487922223/' target='_blank'
    rel='noopener noreferer'>
        LinkedIn
    </Footer.Link>
</Footer.LinkGroup>

</div>

<div>
<Footer.Title title='Legal'/>
<Footer.LinkGroup col>
    <Footer.Link href='#' target='_blank'
    rel='noopener noreferer'>
        Privacy Policy
    </Footer.Link>
    <Footer.Link href='#' target='_blank'
    rel='noopener noreferer'>
        Terms &amp; Conditions
    </Footer.Link>
</Footer.LinkGroup>

</div>



</div>



        </div>

<Footer.Divider/>
<div className='w-full sm:flex sm:items-center sm:justify-between'>
<Footer.Copyright href='#' by='BlogIT' year={new Date().getFullYear()} />
<div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center' >
{/* <Footer.Icon href='#' icon={BsFacebook}/> */}
<Footer.Icon href='https://www.instagram.com/_roheeet_/' icon={BsInstagram} />
<Footer.Icon href='https://github.com/Rohit-59' icon={BsGithub}/>
<Footer.Icon href='https://www.linkedin.com/in/rohit-raghuwanshi-487922223/' icon={BsLinkedin}/>
<Footer.Icon href='https://x.com/roheeeet59' icon={BsTwitterX}/>
</div>
</div>



    </div>


    </Footer>
  )
}

export default FooterC