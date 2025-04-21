import { useContext } from 'react'
import { AppContext } from '../context/app-context'

export function useAppContext() {
  const context = useContext(AppContext)

  if (context === undefined) {
    throw new Error('useAppContext debe ser utilizado dentro de un AppProvider')
  }

  return context
}
