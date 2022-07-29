import React from 'react'

import { useForm } from 'react-hook-form'
import { Paper, Typography, TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAuth, selectIsAuth, fetchRegister } from '../../redux/slices/auth'

import styles from './Login.module.scss'

export const Registration = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuth = useSelector(selectIsAuth)

  if(isAuth) {
    navigate("/")
  }

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      fullName: ''
    },
    mode: 'onChange',
  })

  const onSubmitHandle = async (values) => {
    const data = await dispatch(fetchRegister(values))

    if(!data.payload) {
      return alert("Не вдалося зареєструватися")
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }

    console.log(data)
  }

  return (
    <Paper className={styles.login}>
      <Typography
        variant='h5'
        align='center'
        sx={{ marginBottom: '20px', fontWeight: 'bold' }}
      >
        Створення акаунта
      </Typography>
      <form onSubmit={handleSubmit(onSubmitHandle)}>
        <TextField
          label="Повне ім'я"
          fullWidth
          helperText={errors.fullName?.message}
          error={Boolean(errors.fullName?.message)}
          {...register('fullName', { required: "Вкажіть ваше повне ім'я" })}
        />
        <TextField
          label='email'
          fullWidth
          type="email"
          helperText={errors.email?.message}
          error={Boolean(errors.email?.message)}
          {...register('email', { required: 'Вкажіть електрону пошту' })}
        />
        <TextField
          type='password'
          label='пароль'
          fullWidth
          helperText={errors.password?.message}
          error={Boolean(errors.password?.message)}
          {...register('password', { required: 'Вкажіть пароль' })}
        />
        <Button disabled={!isValid} fullWidth variant='contained' type='submit'>
          Ввійти
        </Button>
      </form>
    </Paper>
  )
}
