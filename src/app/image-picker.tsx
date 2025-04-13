import React, { useRef } from 'react'
import { Button, Box } from '@mui/material'

type TProps = {
  file: File | null
  setFile: React.Dispatch<React.SetStateAction<File | null>>
}

export default function ImagePicker(props: TProps) {
  const { setFile } = props
  const inputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={handleImageChange}
      />
      <Button variant="contained" onClick={() => inputRef.current?.click()}>
        Select Image
      </Button>
    </Box>
  )
}
