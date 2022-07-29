import React, {useState, useMemo, useRef} from 'react'

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import styles from './AddPost.module.scss'

import { Paper, Button, TextField, Box } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';

import axios from '../../axios'
import { useEffect } from 'react';

export const AddPost = () => {
  const navigate = useNavigate()
  const isAuth = useSelector(selectIsAuth)
  if(!window.localStorage.getItem('token') && !isAuth) { // не зареєстрованих користувачів переправляє на головну
    navigate('/')
  }

  const [textValue, setTextValue] = useState('')
  const [imageUrl, setImageUrl] = useState()
  const {register, handleSubmit, formState: {errors, isValid}, getFieldState, formState, setValue} = useForm() 
  const inputFileRef = useRef(null)
  const user = useSelector(state => state.auth.data)


  const {id} = useParams()

  const isEditing = Boolean(id)

  useEffect(() => {
    if(id) {
      axios
        .get(`/posts/${id}`)
        .then(({data}) => {
          console.log(data)

          setImageUrl(data.imageUrl)
          setTextValue(data.text)
          setValue('title', data.title)
          setValue('tags', data.tags.join(', '))
        })
        .catch((err) => {
          alert('Виникла помилка при полученні даних')
          console.warn(err)
        })
    }
  })


  const onChangeInputPhotoFile = async (event) => {
    try {
      const formData = new FormData()
      const file = event.target.files[0]
      formData.append('image', file)
      const { data: { url} } = await axios.post('/upload', formData)
      const editedUrl = url.replace(/\//, '')

      const finalUrl = process.env.REACT_APP_API_URI + editedUrl


      console.log(finalUrl)
      setImageUrl(finalUrl)
    } catch (err) {
      alert('Виникла помилка при загрузки фото')
    }
  }


  const onChangeTextInputHandle = (value) => {
    setTextValue(value)
  }

  const onClickDeletePhotoButton = () => {
    setImageUrl('')
    inputFileRef.current.value = ''
  }

  const options = useMemo(() => ({
    spellChecker: false,
    placeholder: 'Введіть текст...',
    autofocus: true,
    autosave: {
      enabled: true
    }
  }), [])

  const onClickDownloadPhotoButtonHandle = () => {
    inputFileRef.current.click()
  }

  const onSubmitFormHandle = async (values) => {
    console.log(values)
    try {
      const fields = {
        title: values.title,
        tags: values?.tags?.split(', '),
        ...user,
        text: textValue,
        imageUrl: imageUrl
      }

      const { data } = isEditing 
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post('/posts', fields)

      const totalId = data._id

      navigate(`/posts/${totalId}`)
    } catch(err) {
      alert('Виникла помилка при створенні статті')
      console.warn(err)
    }
  }

  return (
    <Paper className={styles.box}>
      <form method='POST' onSubmit={handleSubmit(onSubmitFormHandle)}>
        <Button onClick={onClickDownloadPhotoButtonHandle} variant="outlined">Загрузити фото</Button>
        <input type="file" ref={inputFileRef} onChange={onChangeInputPhotoFile} hidden/>
        {
          imageUrl ? <>
            <Button sx={{marginLeft: '15px'}} color="error" onClick={onClickDeletePhotoButton} variant='contained'>Видалити фото</Button>
            <Box sx={{marginTop: '20px'}} className={styles.imgWrapper}>
              <img src={imageUrl}/>
            </Box>
          </> : <></>
        }
        <br />
        <br />
        <TextField variant='standard' className={styles.titleInput} placeholder="Заголовок статті..." {...register('title')} fullWidth/>
        <TextField variant='standard' className={styles.tagsInput} label="Теги" placeholder='cats, dogs...' {...register('tags')} fullWidth/>
        <SimpleMDE value={textValue} onChange={onChangeTextInputHandle} options={options}/>
        <div>
          <Button variant="contained" type="submit">
            { isEditing ? 'Зберегти' : 'Опублікувати' }
          </Button>
          <Button sx={{marginLeft: '15px'}}>Скаcувати</Button>
        </div>
      </form>
    </Paper>
  )
}