import { Skeleton, Stack } from '@mui/material'
import React from 'react'

const SearchSkeleton = () => {
  return (
    <Stack >
      <Skeleton variant="rectangular" height={50} />
      <Skeleton variant="text" height={150} />
    </Stack>
  )
}

export default SearchSkeleton
