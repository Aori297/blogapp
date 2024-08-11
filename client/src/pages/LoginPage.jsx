import Button from '@/componenets/forms/Button'
import Input from '@/componenets/forms/Input'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import {Field, Label } from '@headlessui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const formSchema = Yup.object().shape({
  email:Yup.string().required("Email is required").email("Please provide a valid email address"),
  password:Yup.string().required("password is required")
})

const LoginPage = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } =useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(formSchema),
  })

  const onSubmit = async values =>{
    console.log(values)
  }

  return (
    <div className='h-screen flex items-center justify-center flex-col'>
      <h1 className='font-play text-3xl font-bold'>Welcome Back!</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 w-[350px] space-y-3"> 
        <Field className='flex flex-col space y-1'>
          <Label className='text-sm'>Email</Label>
          <Input type='email' {...register('email')}/>
        </Field>

        <Field className='flex flex-col space y-1'>
          <Label className='text-sm'>Password</Label>
          <Input type='password' {...register('password')}/>
        </Field>

        <Button type="submit" className = 'w-full !mt-10'> 
          Sign In
        </Button>

      </form>

      <div className='mt-5'>
        <p className='text-sm'>
          Don't have an account?{' '}
          <Link
            to='/register'
            className='hover:underline'>
            Register
          </Link>
        </p>
      </div>

    </div>
  )
}

export default LoginPage