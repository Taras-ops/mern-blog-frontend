import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import axios from '../../axios'
import { Post, MiniPost, Comment, AddComment, PostSkeleton } from '../../components'
import { getCurrentComments } from '../../redux/slices/comments'
import { useDispatch, useSelector } from 'react-redux'

import { Grid, Box, Typography } from '@mui/material'

export const FullPost = () => {
  const dispatch = useDispatch()
  const [postData, setPostData] = useState({})
  const [relatedPosts, setRelatedPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const {currentComments} = useSelector((state) => state.comments)

  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then(({ data }) => {
        setPostData(data)
        setLoading((prev) => !prev)
      })
      .catch((err) => {
        console.warn(err)
        alert('Виникла помилка при получені статті')
      })

    axios
      .get(`/posts/${id}/relatedPosts`)
      .then(({ data }) => setRelatedPosts(data))
      .catch((err) => {
        console.warn(err)
        alert('Виникла помилка при загрузки схожих дописів')
      })

    dispatch(getCurrentComments(id))
  }, [id])

  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={9}>
          {
            loading ? <PostSkeleton fullPost/> : <Post {...postData} fullPost id={postData._id} />
          }
          <Box sx={{marginTop: '50px'}}>
            <AddComment postId={postData._id}/>
            {
              currentComments.length !== 0 ? currentComments.map((comment) => <Comment key={comment._id} {...comment}/>) : <div>
                <Typography>
                  Коментарів до цього допису не знайдено! Будьте першим, хто прокоментує це!
                </Typography>
              </div>
            }
          </Box>
        </Grid>
        <Grid item xs={3}>
          {relatedPosts &&
            relatedPosts.map(({ _id, title, imageUrl }) => (
              <MiniPost key={_id} title={title} id={_id} imageUrl={imageUrl} />
            ))}
        </Grid>
      </Grid>
    </>
  )
}
