import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./scss/style.scss"
import "../node_modules/bootstrap/dist/js/bootstrap.js"
import { BrowserRouter } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
