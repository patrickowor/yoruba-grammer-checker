import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import EditorTest from './EditorText'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    {/* <EditorTest /> */}
  </React.StrictMode>,
)
