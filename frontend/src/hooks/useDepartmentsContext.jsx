import { DepartmentsContext } from '../context/DepartmentsContext'
import { useContext } from 'react'

export const useDepartmentsContext = () => {
  const context = useContext(DepartmentsContext)

  if (!context) {
    throw Error('useDepartmentsContext must be used inside an DeptHeadUsersContextProvider')
  }

  return context
}