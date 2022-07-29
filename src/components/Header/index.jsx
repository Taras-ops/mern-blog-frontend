import React from 'react'

import styles from './Header.module.scss'
import { Container, Button } from '@mui/material'
import {Link} from 'react-router-dom'
import { selectIsAuth, logout } from '../../redux/slices/auth'
import { useSelector, useDispatch } from 'react-redux'

export const Header = () => {
    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch()

    const onClickLogoutButton = () => {
        if (window.confirm("Ви дійсно бажаєте вийти ")) {
            dispatch(logout())
            window.localStorage.removeItem('token')
        }
    }

  return (
    <header className={styles.header}>
        <Container maxWidth="lg">
            <div className={styles.header__inner}>
                <div className={styles.logo}>
                    <Link to="/">MERN Blog</Link>
                </div>
                <div>
                    {
                        isAuth ? <><Button variant="contained" sx={{marginRight: '10px'}}>
                                <Link to="/add-post">Написати статтю</Link>
                            </Button>
                            <Button color="error" variant="contained" onClick={onClickLogoutButton}>Вийти</Button>
                            </> : <><Button variant="contained" sx={{marginRight: '10px'}}>
                                <Link to="/login">Ввійти</Link>
                            </Button>
                            <Button variant="outlined">
                                <Link to="/registration">Створити акаунт</Link>
                            </Button>
                            </>
                    }
                </div>
            </div>
        </Container>
    </header>
  )
}