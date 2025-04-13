import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Sphere360 from './sphere-360'

type TProps = {
  imageUrl: string
}

export default function Viewer360(props: TProps) {
  const { imageUrl } = props
  return (
    <Canvas camera={{ position: [0, 0, 0.1] }}>
      <Sphere360 imageUrl={imageUrl} />
      <OrbitControls enableZoom enablePan />
    </Canvas>
  )
}
