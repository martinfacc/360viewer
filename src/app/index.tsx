import { Box } from '@mui/material'
import Viewer360 from './viewer-360'
import Panel from './panel'

export default function App() {
  return (
    <Box position="relative" width="100%" height="100%">
      <Viewer360 />
      <Panel />
    </Box>
  )
}
