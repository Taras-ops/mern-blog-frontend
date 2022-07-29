import React from 'react'

import styles from './MiniPost.module.scss'

import { Card, CardMedia, CardContent, CardActionArea, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export const MiniPost = ({ title, imageUrl, id }) => {
  return (
    <Card className={styles.card}>
      <CardActionArea>
        <CardMedia image={imageUrl} className={styles.image} />
        <Link to={`/posts/${id}`}>
          <CardContent>
            <Typography sx={{fontWeight: 'semibold'}} variant="h6">
              {title}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  )
}
