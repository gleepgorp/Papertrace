import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { UsersContextProvider } from './context/UsersContext.jsx'
import { DepartmentContextProvider } from './context/DepartmentsContext.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
          <DepartmentContextProvider>
            <UsersContextProvider>
                <Routes>
                  <Route path='/*' element={<App />}/>
                </Routes>
            </UsersContextProvider>
          </DepartmentContextProvider>
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>,
)
