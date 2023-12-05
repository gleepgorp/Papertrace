import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { UsersContextProvider } from './context/UsersContext.jsx'
import { DepartmentContextProvider } from './context/DepartmentsContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DepartmentContextProvider>
      <UsersContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </UsersContextProvider>
    </DepartmentContextProvider>
  </React.StrictMode>,
)
