import './Login.css'
import API from '../api/axios'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
  const [loginData, setLoginData] = useState({})
  const [loginError, setLoginError] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [token, setToken] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const getApiData = async () => {
    try {
      const res = await API.post('/users/login', {
        email,
        password,
      })
      setLoginData(res.data)
      setLoginSuccess(true)
      if (res.data.status === 'success') {
        notifySuccess()
        setTimeout(() => {
          navigate('/')
        }, 3000)
      }
      console.log(res.data)
    } catch (err) {
      console.log(err)
      setLoginError(true)
      notifyError()
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    await getApiData()
    setEmail('')
    setPassword('')
  }

  const notifySuccess = () => {
    return toast.success('Login Successful', {
      position: 'bottom-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    })
  }
  const notifyError = () => {
    return toast.error(
      'Login Failed! Check out the filled details again or try after some time.',
      {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      }
    )
  }

  return (
    <div className='login-container'>
      <ToastContainer />
      <div className='main-heading-container'>
        <h1 className='main-heading'>Login</h1>

        <div className='heading-box'></div>
      </div>
      <form>
        <div className='form-container'>
          <div className='input-div'>
            <label>Email</label>
            <input
              type='email'
              className='input input-email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='input-div'>
            <label>Password</label>
            <input
              type='password'
              className='input input-password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className='submit-button' onClick={onSubmit}>
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
