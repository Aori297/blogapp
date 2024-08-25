import Logo from '@/componenets/forms/Logo'
import { Button } from '@headlessui/react'
import React from 'react'
import { Link } from 'react-router-dom'

export const CreateBlog = () => {
  return (
      <div className='w-full'>
        <div className='fixed top-0 left-0 w-full flex items-center h-[60px] bg-gray-100'>
          <div className='w-full px-5 md:px-0 md:w-[80%] flex mx-auto items-center justify-between'>
            <div className=''>
              <Link to='/'>
                <Logo />
              </Link>
            </div>
  
            <div className=''>
              <Button
                // onClick={handleBlog}
                className='w-[120px] text-sm !rounded-full h-10 bg-green-600 hover:bg-green-700'>
                Publish
              </Button>
            </div>
          </div>
        </div>




        </div>
  
  )
}

export default CreateBlog