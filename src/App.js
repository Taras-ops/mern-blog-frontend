import React, {useEffect} from 'react'
import { Header } from './components'
import { Home, Login, FullPost, Registration, AddPost, TagPosts, NotFound } from './pages'

import { Routes, Route } from 'react-router-dom'
import { Container } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAuthMe } from './redux/slices/auth'

function App() {

  
  const dispatch = useDispatch()

  useEffect(() => {
    window.localStorage.getItem('token') && dispatch(fetchAuthMe())
  }, [])

  const user = useSelector((state) => state.auth?.data)


  return (
    <>
      <Header />
      <Container maxWidth='lg' sx={{paddingBottom: '40px'}}>
        <>
          <Routes>
            <Route path='/' index element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/registration' element={<Registration />} />
            <Route path='/posts/:id' element={<FullPost />} />
            <Route path='/tags/:tag' element={<TagPosts />} />

            {
              user && <>
                <Route path='/posts/:id/edit' element={<AddPost />}/>
                <Route path='/add-post' element={<AddPost />}/>
              </>
            }
            
            <Route path="*" element={<NotFound />}/>
          </Routes>
        </>
      </Container>
    </>
  )
}

export default App
