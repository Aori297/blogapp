import Button from '@/componenets/forms/Button'
import Input from '@/componenets/forms/Input'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import {Field, Label } from '@headlessui/react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUserMutation } from '@/actions/mutations/auth/loginUserMutation'
import { useDispatch } from 'react-redux'
import { SETUSER } from '@/features/authSlice'

const formSchema = Yup.object().shape({
  email:Yup.string().required("Email is required").email("Please provide a valid email address"),
  password:Yup.string().required("Password is required")
})

const LoginPage = () => {

  const navigate  = useNavigate()
  const mutation = loginUserMutation()
  const dispatch = useDispatch()

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
    mutation.mutate(values, {
      onSuccess: data => {
        navigate('/')
        dispatch(SETUSER(data.user))
        localStorage.setItem('access-token', data.accessToken)
      }
    })
  }

  return (
    <div className='h-screen flex items-center justify-center flex-col'>
      <h1 className='font-play text-3xl font-bold'>Welcome Back!</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 w-[350px] space-y-3"> 
        <Field className='flex flex-col space y-1'>
          <Label className='text-sm'>Email</Label>
          <Input type='email' {...register('email')}/>
          {errors.email && (
            <p className='text-xs text-red-500'>{errors.email.message}</p>
          )}
        </Field>

        <Field className='flex flex-col space y-1'>
          <Label className='text-sm'>Password</Label>
          <Input type='password' {...register('password')}/>
          {errors.password && (
            <p className='text-xs text-red-500'>{errors.password.message}</p>
          )}
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