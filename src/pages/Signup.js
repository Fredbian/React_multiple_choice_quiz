import React from 'react'
import {Link} from 'react-router-dom'

export default function Login() {
    return (
        <div className='main-container'>
            <div className='signup-container'>
                <h1>Quiz</h1>
                <form id="signup-form" className='signup-form'>
                    <div>
                        <label>Email</label>
                        <br />
                        <input type='email' className='signup email' placeholder='Enter Email' />
                    </div>
                    <br />
                    <div>
                        <label>Password</label>
                        <br />    
                        <input type='password' className='signup password' placeholder='Enter Password' />
                    </div>
                </form>
                <p>Click "Sign Up" to start your game!</p>
                <div>
                    <Link to='/quiz'>
                        <button className='signup-btn'>Sign Up</button>
                    </Link>
                </div>
                <p>Already have an account? Please click <Link to='/'>Login</Link></p>
            </div>
        </div>
    )
}