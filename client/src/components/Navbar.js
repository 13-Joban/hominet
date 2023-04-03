import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import locofy from '../../public/images/logo.png'
import profilePic from '../../public/images/IMG_1472.jpg'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className='flex items-center justify-between flex-wrap p-6'>
      <div className='flex items-center flex-shrink-0 text-white mr-6 lg:mr-72'>
        <a href='/choose-degree'>
          <Image
            src={locofy}
            className='mr-2'
            width={70}
            height={7}
            alt='Logo'
          />
        </a>
      </div>
      <div className='block lg:hidden'>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400'
        >
          <svg
            className={`fill-current h-3 w-3 ${isOpen ? 'hidden' : 'block'}`}
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
          </svg>
          <svg
            className={`fill-current h-3 w-3 ${isOpen ? 'block' : 'hidden'}`}
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z' />
          </svg>
        </button>
      </div>
      <div
        className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isOpen ? 'block' : 'hidden'
          }`}
      >
        <div className='lg:text-xl text-sm font-normal lg:flex-grow'>
          <a
            href='/choose-degree'
            className='block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4'
          >
            Home
          </a>
          <a
            href='/minor/enrolled/allcourses'
            className='block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4'
          >
            My Courses
          </a>
          <a
            href='https://gndec.ac.in/?q=node%2F7'
            target='_blank'
            className='block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4'
          >
            Vision
          </a>
          <a
            href='https://gndec.ac.in/?q=node%2F9'
            target='_blank'
            className='block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4'
          >
            Mission
          </a>
        </div>


        <a href='/me' className='block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4'>
          <Image
            src={profilePic}
            className='rounded-full mr-2'
            height={6}
            width={60}
            alt='User Profile'
          />
        </a>
      </div>
    </nav>
  )
}

export default Navbar
