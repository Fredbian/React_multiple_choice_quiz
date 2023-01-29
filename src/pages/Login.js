import React from 'react'
import {Link} from 'react-router-dom'




export default function Login() {
    return (
        <div className='main-container'>
            <div className='login-container'>
                <h1>Quiz</h1>
                <form id="login-form" className='login-form'>
                    <div>
                        <label>Email</label>
                        <br />
                        <input type='email' className='login email' placeholder='Enter Email' />
                    </div>
                    <br />
                    <div>
                        <label>Password</label>
                        <br />    
                        <input type='password' className='login password' placeholder='Enter Password' />
                    </div>
                </form>
                <p>Click "Login" to start your game!</p>
                <div>
                    <Link to='/quiz'>
                        <button className='login-btn'>Login</button>
                    </Link>
                </div>
                <p>Don't have an account? Please click <Link to='/signup'>Signup</Link></p>
            </div>
        </div>
    )
}