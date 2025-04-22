import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  useMemo,
  useEffect
} from 'react'
import { addBlackBands } from '../utils/image-processor'

type AppContextType = {
  file: File | null
  setFile: Dispatch<SetStateAction<File | null>>
  isMirrored: boolean
  setIsMirrored: Dispatch<SetStateAction<boolean>>
  useAdaptiveBands: boolean
  setUseAdaptiveBands: Dispatch<SetStateAction<boolean>>
  bandSize: number
  setBandSize: Dispatch<SetStateAction<number>>
  imageUrl: string
  processingImage: boolean
}

export const AppContext = createContext<AppContextType | undefined>(undefined)

type AppProviderProps = {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isMirrored, setIsMirrored] = useState<boolean>(false)
  const [useAdaptiveBands, setUseAdaptiveBands] = useState<boolean>(false)
  const [bandSize, setBandSize] = useState<number>(20)
  const [processedImageUrl, setProcessedImageUrl] = useState<string>('')
  const [processingImage, setProcessingImage] = useState<boolean>(false)

  // Original image URL
  const originalImageUrl = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  // Process the image when relevant parameters change
  useEffect(() => {
    if (!originalImageUrl || !useAdaptiveBands) {
      setProcessedImageUrl('')
      return
    }

    const processImage = async () => {
      try {
        setProcessingImage(true)
        const newImageUrl = await addBlackBands(originalImageUrl, bandSize)
        setProcessedImageUrl(newImageUrl)
      } catch (error) {
        console.error('Error processing image:', error)
        setProcessedImageUrl('')
      } finally {
        setProcessingImage(false)
      }
    }

    processImage()
  }, [originalImageUrl, useAdaptiveBands, bandSize])

  // Final URL to use: the processed one if it exists, or the original
  const imageUrl = useMemo(() => {
    if (useAdaptiveBands && processedImageUrl) {
      return processedImageUrl
    }
    return originalImageUrl
  }, [useAdaptiveBands, processedImageUrl, originalImageUrl])

  const value: AppContextType = useMemo(
    () => ({
      file,
      setFile,
      isMirrored,
      setIsMirrored,
      useAdaptiveBands,
      setUseAdaptiveBands,
      bandSize,
      setBandSize,
      imageUrl,
      processingImage
    }),
    [file, isMirrored, useAdaptiveBands, bandSize, imageUrl, processingImage]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
