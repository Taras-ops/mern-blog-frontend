import React from 'react'

import styles from './Post.module.scss'
import { Skeleton } from '@mui/material'

export const PostSkeleton = ({fullPost}) => {
  return (
    <div className={styles.skeleton}>
        <Skeleton height={fullPost ? 500 : 300} variant="rectangular" />
        <div className={styles.skeleton__content}>
          <div className={styles.skeleton__authorInfo}>
            <Skeleton width={35} height={35} variant="circular"></Skeleton>
            <div >
              <Skeleton width={150}></Skeleton>
              <Skeleton width={100} height={15}></Skeleton>
            </div>
          </div>
          <div className={styles.skeleton__bottomWrapper}>
            <Skeleton width='80%' height={65}/>
            <div className={styles.skeleton__tags}>
              <Skeleton width={30} height={20}/>
              <Skeleton width={45} height={20}/>
              <Skeleton width={25} height={20}/>
            </div>
            <div>
              <Skeleton width='100%' height={20}/>
              <Skeleton width='90%' height={20}/>
              <Skeleton width='95%' height={20}/>
            </div>
            <div className={styles.skeleton__options}>
              <Skeleton width={40}/>
              <Skeleton width={40}/>
              <Skeleton width={40}/>
            </div>
          </div>
        </div>
    </div>
  )
}
