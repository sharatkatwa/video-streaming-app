import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  // const signup = pathname === '/signup'
  // const login = pathname === '/login'

  return (
    <>
      <div className='header-main'>
        <Link className='header-logo' to='/'>
          <FontAwesomeIcon
            className='logo-icon'
            icon={faCirclePlay}
            size='2x'
          />
          <h3 className='logo-text'>VIDEOCOR</h3>
        </Link>

        <ul>
          {pathname === '/signup' && (
            <li>
              <Link to='/login' className='btn slide' href='#news'>
                Login
              </Link>
            </li>
          )}
          {pathname === '/login' && (
            <li>
              <Link to='/signup' className='btn slide' href='#contact'>
                Signup
              </Link>
            </li>
          )}
          {pathname !== '/signup' && pathname !== '/login' && (
            <>
              <li>
                <Link to='/login' className='btn slide' href='#news'>
                  Login
                </Link>
              </li>
              <li>
                <Link to='/signup' className='btn slide' href='#contact'>
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  )
}
export default Header
