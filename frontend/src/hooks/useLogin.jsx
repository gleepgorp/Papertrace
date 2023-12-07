import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const login = async (username, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('http://localhost:3000/api/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username, password})
    })

    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }

    if (response.ok) {
      // save user to local storage
      localStorage.setItem('user', JSON.stringify({ user: json, role: json.user.role }));

      // update auth context
      dispatch({type: 'LOGIN', payload: {user: json, role: json.user.role}})

      // navigate to home
      navigate('/')
      setIsLoading(false)
    }
  }

  return { login, isLoading, error }
}

export default useLogin