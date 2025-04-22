import { useRef, useState, useEffect } from 'react'
import {
  Box,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Slider,
  CircularProgress,
  Typography
} from '@mui/material'
import Iconify from '../components/iconify'
import { useAppContext } from '../hooks/use-app-context'

export default function Panel() {
  const {
    isMirrored,
    setIsMirrored,
    useAdaptiveBands,
    setUseAdaptiveBands,
    bandSize,
    setBandSize,
    setFile,
    processingImage
  } = useAppContext()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Local state for slider value with debounce
  const [localBandSize, setLocalBandSize] = useState(bandSize)
  const timeoutRef = useRef<number | null>(null)

  // Update local value when global value changes
  useEffect(() => {
    setLocalBandSize(bandSize)
  }, [bandSize])

  // Function to handle slider changes with debounce
  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    const value = newValue as number
    setLocalBandSize(value)

    // Clear any pending timeout
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current)
    }

    // Set a new timeout to update the real value
    timeoutRef.current = window.setTimeout(() => {
      setBandSize(value)
      timeoutRef.current = null
    }, 300) // 300ms delay
  }

  // Clean up the timeout when component unmounts
  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Simplified handlers
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
          <ListItemText>Select image</ListItemText>
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
          <ListItemText>Mirror image</ListItemText>
          <Switch
            edge="end"
            checked={isMirrored}
            slotProps={{ input: { 'aria-labelledby': 'mirror-switch' } }}
          />
        </MenuItem>

        <MenuItem
          onClick={() => {
            setUseAdaptiveBands(!useAdaptiveBands)
          }}
        >
          <ListItemIcon>
            <Iconify icon="mdi:image-filter" width={24} />
          </ListItemIcon>
          <ListItemText>Add adaptive bands</ListItemText>
          <Switch
            edge="end"
            checked={useAdaptiveBands}
            slotProps={{ input: { 'aria-labelledby': 'black-bands-switch' } }}
          />
        </MenuItem>

        {useAdaptiveBands && (
          <Box sx={{ width: '100%', px: 2 }}>
            <Typography variant="body2" gutterBottom>
              Band size: {localBandSize}%
            </Typography>
            <Slider
              value={localBandSize}
              onChange={handleSliderChange}
              min={1}
              max={50}
              step={1}
              aria-labelledby="black-band-size-slider"
              disabled={processingImage}
            />
            {processingImage && (
              <Box display="flex" justifyContent="center" mt={1}>
                <CircularProgress size={20} />
              </Box>
            )}
          </Box>
        )}
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
