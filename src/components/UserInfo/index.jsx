import React from 'react'
import styles from './UserInfo.module.scss'
import moment from 'moment'

import { Typography, Grid } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';


export const UserInfo = ({fullName, avatarUrl, createdAt}) => {

  const timeFromNow = moment(createdAt).fromNow();

  return (
    <Grid container className={styles.userInfo}>
        <div className={styles.avatar}>
            {
              avatarUrl ? <img src={avatarUrl} alt={fullName}/> : <div>
                <PersonIcon />
              </div>
            }
        </div>
        <div>
            <Typography paragraph sx={{marginBottom: '2px', fontWeight: 'bold'}}>{fullName}</Typography>
            <Typography sx={{color: 'gray', fontSize: '12px'}}>{timeFromNow}</Typography>
        </div>
    </Grid>
  )
}
