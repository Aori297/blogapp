import Editor from '@/componenets/forms/Editor'
import Logo from '@/componenets/forms/Logo'
import Textarea from '@/componenets/forms/Textarea'
import { setBlog } from '@/features/blogSlice'
import { Button } from '@headlessui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

export const CreateBlog = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleTitleKeyDown = e => { 
    if (e.code === "Enter"){
      e.preventDefault()
    }
  }

  const handleBlog = () => {
    dispatch(setBlog({title, content}))
    navigate('/admin/publish')
  } 

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
                onClick={handleBlog}
                className='w-[120px] text-sm !rounded-full h-10 bg-green-600 hover:bg-green-700'>
                Publish
              </Button>
            </div>
          </div>
        </div>

        <div className='mt-[90px] w-full px-5 md:px-0 md:w-[80%] mx-auto'>
          <Textarea
            onChange={e => setTitle(e.target.value)}
            onKeyDown={handleTitleKeyDown}
            placeholder='Blog Title'
          />
          <div className=''>
            <Editor
              content={content}
              setContent={setContent}
            />
          </div>
        </div>

        </div>
  
  )
}

export default CreateBlog