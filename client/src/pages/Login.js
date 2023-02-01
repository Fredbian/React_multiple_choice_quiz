import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useMutation } from "@apollo/react-hooks";
import { LOGIN_USER } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";



export default function Login() {

    const [loginFormData, setLoginFormData] = useState({ email: '', password: '' })

    const [loginUser, { error, data }] = useMutation(LOGIN_USER, {
        refetchQueries: [
            { query: QUERY_ME }
        ]
    })

    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setLoginFormData({
            ...loginFormData,
            [name]: value
        })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        // use loginUser function
        try {
            const { data } = await loginUser({
                variables: { ...loginFormData }
            })

            Auth.login(data.login.token)

            setLoginFormData({
                email: '',
                password: ''
            })

            const path = '/quiz'
            navigate(path)

        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className='main-container'>
            {data ? (
                <p>
                    Login Success! You may now head to{' '}
                    <Link to="/quiz">Quiz</Link>.
                </p>
            ) : (
                <>
                    <div className='login-container'>
                        <h1>Quiz</h1>
                        <form id="login-form" className='login-form' onSubmit={handleFormSubmit}>
                            <div>
                                <label>Email</label>
                                <br />
                                <input
                                    type='email'
                                    name='email'
                                    id='email'
                                    className='login email'
                                    placeholder='Enter Email'
                                    value={loginFormData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <br />
                            <div>
                                <label>Password</label>
                                <br />
                                <input
                                    type='password'
                                    name='password'
                                    id='password'
                                    className='login password'
                                    placeholder='Enter Password'
                                    value={loginFormData.password}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </form>
                        <p>Click "Login" to start your game!</p>
                        <div>
                            <button className='login-btn' type='submit' form='login-form'>Login</button>
                        </div>
                        <p>Don't have an account? Please click <Link to='/signup'>Signup</Link></p>
                    </div>
                </>
            )}
        </div>
    )
}