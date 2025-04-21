import { createContext, ReactNode, useState, Dispatch, SetStateAction, useMemo } from 'react'

type AppContextType = {
  file: File | null
  setFile: Dispatch<SetStateAction<File | null>>
  isMirrored: boolean
  setIsMirrored: Dispatch<SetStateAction<boolean>>
  imageUrl: string
}

export const AppContext = createContext<AppContextType | undefined>(undefined)

type AppProviderProps = {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isMirrored, setIsMirrored] = useState<boolean>(false)

  const value: AppContextType = useMemo(
    () => ({
      file,
      setFile,
      isMirrored,
      setIsMirrored,
      imageUrl: file ? URL.createObjectURL(file) : ''
    }),
    [file, isMirrored]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
