import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Sphere360 from './sphere-360'
import { Box, Typography } from '@mui/material'
import { useAppContext } from '../hooks/use-app-context'

export default function Viewer360() {
  const { imageUrl } = useAppContext()

  if (!imageUrl)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <Typography variant="h6">No image selected</Typography>
      </Box>
    )

  return (
    <Canvas camera={{ position: [0, 0, 0.1] }}>
      <Sphere360 />
      <OrbitControls enableZoom enablePan />
    </Canvas>
  )
}
