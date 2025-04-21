import { useRef, useState } from 'react'
import { Box, Button, Menu, MenuItem, ListItemIcon, ListItemText, Switch } from '@mui/material'
import Iconify from '../components/iconify'
import { useAppContext } from '../hooks/use-app-context'

export default function Panel() {
  const { isMirrored, setIsMirrored, setFile } = useAppContext()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Manejadores simplificados
  const handleFileSelect = () => {
    inputRef.current?.click()
    setAnchorEl(null)
  }

  return (
    <Box position="absolute" bottom={16} right={16} zIndex={2}>
      <Button
        variant="contained"
        color="primary"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{ borderRadius: '50%', minWidth: 0, width: 56, height: 56 }}
      >
        <Iconify icon="mdi:tools" width={24} />
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <MenuItem onClick={handleFileSelect}>
          <ListItemIcon>
            <Iconify icon="mdi:image" width={24} />
          </ListItemIcon>
          <ListItemText>Seleccionar imagen</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => {
            setIsMirrored(!isMirrored)
            setAnchorEl(null)
          }}
        >
          <ListItemIcon>
            <Iconify icon="mdi:mirror" width={24} />
          </ListItemIcon>
          <ListItemText>Invertir imagen</ListItemText>
          <Switch
            edge="end"
            checked={isMirrored}
            slotProps={{ input: { 'aria-labelledby': 'mirror-switch' } }}
          />
        </MenuItem>
      </Menu>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => {
          const selectedFile = e.target.files?.[0]
          if (selectedFile) {
            setFile(selectedFile)
            setAnchorEl(null)
          }
        }}
      />
    </Box>
  )
}
