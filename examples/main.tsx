import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

const element = document.createElement('div')

document.body.appendChild(element)

createRoot(element).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
