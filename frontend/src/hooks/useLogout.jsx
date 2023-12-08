import { useAuthContext } from "../hooks/useAuthContext"
import { useUsersContext } from "./useUsersContext"
import { useNavigate } from 'react-router-dom'

export const useLogout = () => {
  const navigate = useNavigate()
  const { dispatch } = useAuthContext()
  const { dispatch: usersDispatch } = useUsersContext()

  const logout = () => {
    // remove user from storage

    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({type: 'LOGOUT'})
    usersDispatch({type: 'SET_USERS', payload: null})

    // navigate to login
    navigate('/login')
  }

  return {logout}
}

export default useLogout