import { useRef } from 'react'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'

type TProps = {
  imageUrl: string
}

export default function Sphere360(props: TProps) {
  const { imageUrl } = props
  const texture = useLoader(TextureLoader, imageUrl)
  const meshRef = useRef<any>(null)

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={2} />
    </mesh>
  )
}
