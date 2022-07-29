import React from 'react'

import styles from './AddComment.module.scss'

import { Paper, TextareaAutosize, Button, Typography } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'

import { useSelector, useDispatch } from 'react-redux'
import { createComment } from '../../redux/slices/comments'
import { useForm } from 'react-hook-form'

import {Link} from 'react-router-dom' 

export const AddComment = ({ postId }) => {
  const user = useSelector((state) => state.auth.data)
  const dispatch = useDispatch()
  const {
    handleSubmit,
    formState: { errors, isValid },
    register,
    setValue,
  } = useForm({
    mode: 'onChange',
  })

  const onFormSubmit = (values) => {
    console.log(isValid)
    if (isValid) {
      dispatch(
        createComment({
          postId: postId,
          values: values,
          userAvatarUrl: user.avatarUrl,
          userName: user.fullName,
        })
      )
      setValue('text', '')
    }
  }

  return (
    <Paper className={styles.box}>
      <div className={styles.wrapper}>
        {user ? (
          <>
            <div className={styles.imgWrapper}>
              {user && user.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.fullName} />
              ) : (
                <PersonIcon />
              )}
            </div>
            <form className={styles.form} onSubmit={handleSubmit(onFormSubmit)}>
              <TextareaAutosize
                className={styles.textarea}
                minRows={4}
                placeholder='Твій коментар'
                {...register('text', {
                  required: true,
                })}
              />
              <Button variant='contained' type='submit'>
                Надіслати
              </Button>
            </form>
          </>
        ) : <Typography><Link to="/register" className={styles.link}>Приєднуйся до нас</Link>, щоб коментувати дописи разом з нами!</Typography>}
      </div>
    </Paper>
  )
}
