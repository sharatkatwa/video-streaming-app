import './Signup.css'
import API from '../api/axios'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Signup = () => {
  const [signupData, setSignupData] = useState({})
  const [signupError, setSignupError] = useState({})
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const getApiData = async () => {
    try {
      const res = await API.post('/users/signup', {
        name: username,
        email,
        password,
      })
      setSignupData(res.data)
      console.log(res.data.status)
      if (res.data.status === 'success') {
        notifySuccess()
      }
    } catch (err) {
      console.log(err)
      setSignupError(err)
      notifyError()
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    await getApiData()
    setUsername('')
    setEmail('')
    setPassword('')
  }

  const notifySuccess = () => {
    return toast.success(signupData.msg, {
      position: 'bottom-center',
      autoClose: 5000,
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
      'Error Creating user! Check out the filled details again or try after some time.',
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
    <div className='signup-container'>
      <ToastContainer />
      <div className='main-heading-container'>
        <h1 className='main-heading'>SignUp</h1>

        <div className='heading-box'></div>
      </div>
      <form>
        <div className='form-container'>
          <div className='input-div'>
            <label>Username</label>
            <input
              type='text'
              className='input input-username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='input-div'>
            <label>Email</label>
            <input
              type='email'
              className='input input-email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='input-div'>
            <label>Password</label>
            <input
              type='password'
              className='input input-password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className='submit-button' onClick={onSubmit}>
            Signup
          </button>
        </div>
      </form>
    </div>
  )
}

export default Signup
