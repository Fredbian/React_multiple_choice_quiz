import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useMutation } from "@apollo/react-hooks"
import { ADD_USER } from "../utils/mutations"
import Auth from "../utils/auth"
import { QUERY_ME } from '../utils/queries'


export default function Login() {
    const [signupFormData, setSignupFormData] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const [addUser, { error, data }] = useMutation(ADD_USER, {
        refetchQueries: [
            { query: QUERY_ME }
        ]
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setSignupFormData({
            ...signupFormData,
            [name]: value
        })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        try {
            const { data } = await addUser({
                variables: { ...signupFormData }
            })

            Auth.login(data.addUser.token)

            setSignupFormData({
                email: '',
                password: ''
            })
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
                <div className='signup-container'>
                    <h1>Quiz</h1>
                    <form id="signup-form" className='signup-form' onSubmit={handleFormSubmit}>
                        <div>
                            <label>Email</label>
                            <br />
                            <input
                                type='email'
                                name='email'
                                id='email'
                                className='signup email'
                                placeholder='Enter Email'
                                value={signupFormData.email}
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
                                className='signup password'
                                placeholder='Enter Password'
                                value={signupFormData.password}
                                onChange={handleInputChange}
                            />
                        </div>
                    </form>
                    <p>Click "Sign Up" to start your game!</p>
                    <div>
                        <button form='signup-form' type='submit' className='signup-btn'>Sign Up</button>
                    </div>
                    <p>Already have an account? Please click <Link to='/'>Login</Link></p>
                </div>
            )}
        </div>
    )
}