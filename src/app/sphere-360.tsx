import { useRef } from 'react'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { useAppContext } from '../hooks/use-app-context'

export default function Sphere360() {
  const { imageUrl, isMirrored } = useAppContext()

  const texture = useLoader(TextureLoader, imageUrl)
  const meshRef = useRef<any>(null)

  // Si isMirrored es true, invertimos la textura horizontalmente
  if (isMirrored && texture) {
    texture.wrapS = 1000 // RepeatWrapping
    texture.repeat.x = -1 // Invertir horizontalmente
  } else if (texture) {
    texture.wrapS = 1000 // RepeatWrapping
    texture.repeat.x = 1 // Volver a la normalidad
  }

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={2} />
    </mesh>
  )
}
