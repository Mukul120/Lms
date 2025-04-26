import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import { BrowserRouter } from "react-router-dom"
import App from './App.jsx'
import { Provider } from "react-redux"
import { store } from './Store/store.js'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>,
  </BrowserRouter>
)
