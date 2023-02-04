import React from 'react'
import './login.css'
import { loginEndpoint } from '../../spotify'

const Login = () => {
    
  return (
    <div className='login-container'>
      <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png" alt="spotify"  />
      <div className="credentials">
        <p className='login-heading'>Use the following credentials for login</p>
        <p className="login-title">Username : koxotoy541@fsouda.com</p>
        <p className="login-subtitle">Password : SpotifyClone</p>
      </div>
      <a href={loginEndpoint}><button className='btn'>LOG IN</button></a>
    </div>
  )
}

export default Login
