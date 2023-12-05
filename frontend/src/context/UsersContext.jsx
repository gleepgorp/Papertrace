import { createContext, useReducer } from "react";

export const UsersContext = createContext()

export const usersReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return {
        users: action.payload
      }
    case 'CREATE_USERS':
      return {
        users: [action.payload, ...state.users]
      }
    case 'DELETE_USER':
      return {
        users: state.users.filter((user) => user._id !== action.payload._id)
      }
    case 'EDIT_USER':
      return {
        users: state.users.map((user) =>
        user._id === action.payload._id ? { ...user, ...action.payload } : user
        )
      }
    default:
      return state
  }
}

export const UsersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(usersReducer, {
    users: null
  })

  return (
    <UsersContext.Provider value={{...state, dispatch}}>
      { children }
    </UsersContext.Provider>
  )
}