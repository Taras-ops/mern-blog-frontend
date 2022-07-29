import React, { useEffect, useState } from 'react'

import { Post } from '../../components'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPostsByTag } from '../../redux/slices/posts'

import axios from '../../axios'

export const TagPosts = () => {
  const dispatch = useDispatch()
  const { tag } = useParams()

  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios
        .get(`/tags/${tag}`)
        .then(({data}) => setPosts(data))
        .catch((err) => {
            alert('Виникла помилка при завантаженні статей')
            console.warm(err)
        })
  }, [])


  return (
    <div>{posts && posts.map((post) => <Post key={post._id} {...post} fullPost/>)}</div>
  )
}
