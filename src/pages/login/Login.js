import React from 'react'
import './login.css'
import { loginEndpoint } from '../../spotify'

const Login = () => {
    
  return (
    <div className='login-container'>
      <div className='imgdiv'>
      <img src="android-chrome-512x512.png" alt="spotify"  />
      <p className='img-title'>T-Series</p>
      </div>
      <div className="credentials">
        <p className='login-heading'>Use the following credentials for login</p>
        <p className="login-title">Username : tseries@yopmail.com</p>
        <p className="login-subtitle">Password : Spotify Clone</p>
      </div>
      <a href={loginEndpoint}><button className='btn'>LOG IN</button></a>
    </div>
  )
}

export default Login
