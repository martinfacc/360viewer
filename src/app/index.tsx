import { useMemo, useState } from 'react'
import ImagePicker from './image-picker'
import Viewer360 from './viewer-360'

export default function App() {
  const [file, setFile] = useState<File | null>(null)

  const imageUrl = useMemo(() => {
    if (file) {
      return URL.createObjectURL(file)
    }
    return ''
  }, [file])

  if (!file) {
    return <ImagePicker file={file} setFile={setFile} />
  }

  return <Viewer360 imageUrl={imageUrl} />
}
