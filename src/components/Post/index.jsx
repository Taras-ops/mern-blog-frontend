import React, { useState, useMemo, useEffect, useCallback } from 'react'
import styles from './Post.module.scss'
import { UserInfo } from '../'
import { Link } from 'react-router-dom'
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import VisibilityIcon from '@mui/icons-material/Visibility'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { deletePost } from '../../redux/slices/posts'

import axios from '../../axios'

export const Post = ({
  imageUrl,
  title,
  tags,
  user,
  createdAt,
  id,
  fullPost,
  text,
  viewsCount,
  isEditable,
  commentsCount,
  likes,
}) => {
  const dispatch = useDispatch()
  const currentCommentsCountRedux = useSelector(
    (state) => state.comments.commentsCount
  )
  const currentUserId = useSelector(({auth}) => auth.data && auth?.data._id)
  let currentComentsCount = commentsCount
  if (fullPost) {
    currentComentsCount = currentCommentsCountRedux
  }


  const [likeCount, setLikeCount] = useState(likes.length)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    if (likes.includes(currentUserId)) setIsLiked(true)
  }, [])


  const onClickDeleteButton = () => {
    const isAgree = window.confirm('Ви дійсно хочете видалити цей пост?')

    if (isAgree) {
      dispatch(deletePost(id))
    }
  }

  const onLikeButtonHandleClick = () => {
    if(!currentUserId) {
      return alert('Увійдіть або зареєструйтся, щоб вподобати допис!')
    }
    setIsLiked((prev) => !prev)
    axios.put(`/posts/${id}/like`)
    if(!isLiked) {
      setLikeCount((prev) => prev + 1)
    } else {
      setLikeCount((prev) => prev - 1)
    }
  }

  return (
    <Card
      className={
        fullPost ? `${styles.post} ${styles.fullPost}` : `${styles.post}`
      }
    >
      {isEditable && (
        <div className={styles.post__options}>
          <Link to={`posts/${id}/edit`}>
            <IconButton color='primary'>
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton color='error' onClick={onClickDeleteButton}>
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {imageUrl && (
        <CardMedia
          src={imageUrl}
          className={styles.post__img}
          component='img'
          alt={title}
        />
      )}
      <CardContent className={styles.post__content}>
        <UserInfo {...user} createdAt={createdAt} />
        <div className={styles.post__indention}>
          <Link to={`/posts/${id}`}>
            <Typography variant='h4'>{title}</Typography>
          </Link>
          <div>
            {tags &&
              tags?.map((tag) => (
                <Link
                  className={styles.post__tag}
                  key={tag}
                  to={`/tags/${tag}`}
                >
                  {'#' + tag}
                </Link>
              ))}
          </div>
          {fullPost ? (
            <ReactMarkdown children={text} remarkPlugins={[remarkGfm]} />
          ) : (
            ''
          )}
          <ul className={styles.post__details}>
            <li>
              <IconButton onClick={onLikeButtonHandleClick}>
                {isLiked ? (
                  <FavoriteIcon sx={{ color: '#ff0000' }}/>
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
              <span>{likeCount}</span>
            </li>
            <li>
              <VisibilityIcon />
              <span>{viewsCount}</span>
            </li>
            <li>
              <ChatBubbleOutlineIcon />
              <span>{currentComentsCount}</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
