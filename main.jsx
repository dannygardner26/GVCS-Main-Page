import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import ClubWebsite from './ClubWebsite.jsx'
import './index.css'

// Import NotificationProvider from ClubWebsite
// We'll need to export it from ClubWebsite.jsx
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <ClubWebsite />
        </BrowserRouter>
    </React.StrictMode>,
)
