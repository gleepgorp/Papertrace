import { createContext, useReducer } from "react";

export const DepartmentsContext = createContext()

export const departmentsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DEPARTMENTS':
      return {
        departments: action.payload
      }
     case 'CREATE_DEPARTMENT' :
      return {
        departments:[action.payload, ...state.departments]
      }
     case 'DELETE_DEPARTMENT': 
     return {
      departments: state.departments.filter((dept) => dept._id !== action.payload._id)
     }
     case 'EDIT_DEPARTMENT':
      return {
        departments: state.departments.map((dept) => dept._id === action.payload._id ? { ...dept, ...action.payload } : dept
        )
      }
    default:
      return state
  }
}

export const DepartmentContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(departmentsReducer, {
    departments: null
  })

  return (
    <DepartmentsContext.Provider value={{...state, dispatch}}>
      { children }
    </DepartmentsContext.Provider>
  )
}