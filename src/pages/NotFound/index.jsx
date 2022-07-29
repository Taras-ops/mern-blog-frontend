import React from 'react'

import { Typography } from '@mui/material'

export const NotFound = () => {
  return (
    <div>
      <div>
        <Typography sx={{textTransform: 'uppercase'}} variant="h1">404</Typography>
        <Typography sx={{textTransform: 'uppercase'}} variant="h3">page not found</Typography>
      </div>
    </div>
  )
}
