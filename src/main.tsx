import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app'
import { AppProvider } from './context/app-context'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <div
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <App />
      </div>
    </AppProvider>
  </StrictMode>
)
