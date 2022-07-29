import React from 'react'

import styles from './TagsBlock.module.scss'
import { Link } from 'react-router-dom'

import TagIcon from '@mui/icons-material/Tag'
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Skeleton,
} from '@mui/material'

export const TagsBlock = ({ items, status }) => {
  return (
    <Paper sx={{ padding: '8px 10px', width: '100%' }}>
      <Typography component='h6' sx={{ fontWeight: 'bold' }}>
        Теги
      </Typography>
      <List>
        {status == "loaded" ? items.map((tag, index) => (
          <Link to={`tags/${tag}`} key={index}>
            <ListItem sx={{ padding: 0 }}>
              <ListItemIcon sx={{ minWidth: '30px' }}>
                <TagIcon />
              </ListItemIcon>
              <ListItemButton>{tag}</ListItemButton>
            </ListItem>
          </Link>
        )) : (
          <>
            <Skeleton variant='text' width='40' />
            <Skeleton variant='text' width='40' />
            <Skeleton variant='text' width='40' />
            <Skeleton variant='text' width='40' />
            <Skeleton variant='text' width='40' />
          </>
        )}
      </List>
    </Paper>
  )
}
