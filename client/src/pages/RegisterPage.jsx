import Button from '@/componenets/forms/Button'
import Input from '@/componenets/forms/Input'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import {Field, Label } from '@headlessui/react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUserMutation } from '@/actions/mutations/auth/registerUserMutation'

const formSchema = Yup.object().shape({
  firstName:Yup.string().required("First Name is required"),
  lastName:Yup.string().required("Last Name is required"),
  email:Yup.string().required("Email is required").email("Please provide a valid email address"),
  password:Yup.string().required("Password is required"),
  confirmPassword:Yup.string().required("Confirm Password is required").oneOf([Yup.ref('password'), null], 'Passwords must match'),
})

const RegisterPage = () => {

  const navigate  = useNavigate()
  const mutation = registerUserMutation()

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
      onSuccess: () => {
        navigate('/login')
      }
    })
  }

  return (
    <div className='h-screen flex items-center justify-center flex-col'>
      <h1 className='font-play text-3xl font-bold'>Register</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 w-[350px] space-y-3"> 
        <Field className='flex flex-col space y-1'>
          <Label className='text-sm'>First Name</Label>
          <Input type='text' {...register('firstName')}/>
          {errors.firstName && (
            <p className='text-xs text-red-500'>{errors.firstName.message}</p>
          )}
        </Field>

        <Field className='flex flex-col space y-1'>
          <Label className='text-sm'>Last Name</Label>
          <Input type='text' {...register('lastName')}/>
          {errors.lastName && (
            <p className='text-xs text-red-500'>{errors.lastName.message}</p>
          )}
        </Field>

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

        <Field className='flex flex-col space y-1'>
          <Label className='text-sm'>Confirm Password</Label>
          <Input type='password' {...register('confirmPassword')}/>
          {errors.confirmPassword && (
            <p className='text-xs text-red-500'>{errors.confirmPassword.message}</p>
          )}
        </Field>

        <Button type="submit" className = 'w-full !mt-10'> 
          Register
        </Button>

      </form>

      <div className='mt-5'>
        <p className='text-sm'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='hover:underline'>
            Login
          </Link>
        </p>
      </div>

    </div>
  )
}

export default RegisterPage