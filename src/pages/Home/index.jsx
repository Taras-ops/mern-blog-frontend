import React, {useEffect, useState} from 'react'

import styles from './Home.module.scss'

import { Post, TagsBlock, PostSkeleton } from '../../components/'
import { Grid, Tabs, Tab, Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { fetchPosts, fetchTags } from '../../redux/slices/posts'

export const Home = () => {
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.auth.data)
  const { posts, tags } = useSelector((state) => state.posts)
  const [tabValue, setTabValue] = useState(0)
  let popular = tabValue === 1


  useEffect(() => {
    dispatch(fetchTags())
    dispatch(fetchPosts())
  }, [])

  useEffect(() => {
      dispatch(fetchPosts({popular: popular}))
  }, [tabValue])

  const onTabsChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <>
      <Box sx={{ marginBottom: '25px' }}>
        <Tabs value={tabValue} onChange={onTabsChange}>
          <Tab label='Нові' />
          <Tab label='Популярні' />
        </Tabs>
      </Box>
      <Grid container spacing={6}>
        <Grid item sm={8}>
          {
            posts.status == 'loading' 
            ?  [...Array(5).keys()].map((item, index) => <PostSkeleton key={index}/>)
            : posts.items?.map((post) => <Post 
                key={post._id}
                id={post._id}
                commentsCount={post.comments.length}
                isEditable={post?.user._id == userData?._id}
                {...post}
            />)
          }
        </Grid>
        <Grid item sm={4} className={styles.tagsBlock}>
          <TagsBlock items={tags.items} status={tags.status}/>
        </Grid>
      </Grid>
    </>
  )
}
