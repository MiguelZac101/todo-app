import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import { system } from './theme.ts'

// Fuerza dark mode antes de que Chakra cargue
localStorage.setItem('chakra-ui-color-mode', 'dark')

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ChakraProvider value={system}>
      		<App />
    	</ChakraProvider>
	</StrictMode>,
)
