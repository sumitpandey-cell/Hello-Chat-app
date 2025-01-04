import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {CssBaseline} from "@mui/material"
import {HelmetProvider} from "react-helmet-async"

createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
        <CssBaseline/>
        <App />
      </HelmetProvider>
)
