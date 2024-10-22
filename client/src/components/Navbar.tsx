
import { Link } from 'react-router-dom'
import { assets} from '../assets/assets'
import React from 'react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'

const Navbar: React.FC = () => {
  

  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();
  return (
    <div className='flex justify-between items-center mx-4  py-3 lg:mx-44'>
      <Link to="/">
       <img src={assets.logo} alt="logo" className='w-32 sm:w-44' />
      </Link>

      {
        isSignedIn ? <div>
           <UserButton />
          </div>:<button onClick={()=>openSignIn()} className='bg-zinc-900 text-white flex items-center gap-4 px-4 py-2 sm:px-8 smLpy-3 rounded-full text-sm'>
        Get Started <img className='w-3 sm:w-4' src={assets.arrow_icon} alt="arrow" />
      </button>
      }

      
    </div>
  )
}

export default Navbar