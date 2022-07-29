import React, { useState } from 'react'

import styles from './Comment.module.scss'

import { Typography, Paper, IconButton } from '@mui/material'
import { UserInfo } from '../UserInfo'

import ShareIcon from '@mui/icons-material/Share'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'


export const Comment = ({ text, user, createdAt }) => {
  const [isLiked, setIsLiked] = useState(false)

  const likeButtonHandleClick = () => {
    setIsLiked((prev) => !prev)
  }

  return (
    <Paper className={styles.comment}>
      <UserInfo {...user} createdAt={createdAt} />
      <div className={styles.comment__content}>
        <Typography>{text}</Typography>
        <div className={styles.comment__bottom}>
          <div>
            <IconButton onClick={likeButtonHandleClick}>
              {isLiked ? (
                <FavoriteIcon sx={{color: 'red'}} fontSize='small' />
              ) : (
                <FavoriteBorderIcon fontSize='small' />
              )}
            </IconButton>
            <Typography>0</Typography>
          </div>
          <div>
            <ChatBubbleOutlineIcon fontSize='small' />
            <Typography>Відповісти</Typography>
          </div>
          <div>
            <ShareIcon fontSize='small' />
            <Typography>Поділитися</Typography>
          </div>
        </div>
      </div>
    </Paper>
  )
}
