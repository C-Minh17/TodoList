import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AllRoutes from './router/AllRoutes.tsx'
import "./index.css"

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <AllRoutes/>
    </StrictMode>
  </BrowserRouter>
)
