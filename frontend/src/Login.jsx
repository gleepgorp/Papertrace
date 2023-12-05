import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import MainLogo from '../public/MainLogo.svg'
import useLogin from './hooks/useLogin'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(username, password)
  }
  return (
    <>
    <form onSubmit={handleSubmit}>
      <div id="form-container">
        <div id="form-wrapper">
          <div id="login-header">
            <img id='main-logo' src={MainLogo} />
            <span id='span1'>Login to PaperTrace</span>
            <span id='span2'>Use your <span id='span3'>UCLM ID</span></span>
          </div>

          <form id="input-wrapper">
            <input 
              type="text" 
              placeholder='username'
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />

            <input 
              type="password" 
              placeholder='password' 
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <div>
              {error && <div className='login-error'>{error}</div>}
            </div>
          </form>
          <div id="button-link-wrapper">
            <button 
              disabled={isLoading}
              id='login-button'>Login
            </button>
            <Link to='/forgot-password' >Forgot password?</Link>
          </div>
        </div>
      </div>
    </form>
    </>
  )
}

export default Login