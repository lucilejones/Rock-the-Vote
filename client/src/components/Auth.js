import React, { useState, useContext } from 'react'
import AuthForm from './AuthForm'
import { UserContext } from '../context/UserProvider'

const initInputs = { username: "", password: "" }

export default function Auth() {
    const [inputs, setInputs] = useState(initInputs)
    const [toggle, setToggle] = useState(false)

    const { signup, login, errMsg, resetAuthErr } = useContext(UserContext)

    function handleChange(e) {
        const { name, value } = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSignup(e) {
        e.preventDefault()
        signup(inputs)
    }

    function handleLogin(e) {
        e.preventDefault()
        login(inputs)
    }

    function toggleForm() {
        setToggle(prev => !prev)
        resetAuthErr()
    }

    return (
        <>
            <h1 className='display-4 text-dark fw-bold text-center main-title py-2'>Rock the Vote</h1>
            <div className='background-main-image py-3 mb-2'>
                <div className='container main py-3'>
                    <div className='row'>
                        <div className='col-sm-5 px-5 mt-2 mb-n5 order-sm-2'>
                            {toggle ?
                                <>
                                    <AuthForm
                                        handleChange={handleChange}
                                        handleSubmit={handleSignup}
                                        inputs={inputs}
                                        btnText="Sign up"
                                        errMsg={errMsg}
                                    />
                                    <p onClick={toggleForm}>Already a member?</p>
                                </>
                                :
                                <>
                                    <AuthForm
                                        handleChange={handleChange}
                                        handleSubmit={handleLogin}
                                        inputs={inputs}
                                        btnText="Login"
                                        errMsg={errMsg}
                                    />
                                    <p onClick={toggleForm}>Not a member?</p>
                                </>
                            }
                        </div>
                        <div className='col-sm-7 order-sm-1'>
                            <p className='display-4'>Vote on Social Issues</p>
                            <p className='h2 pt-3 pb-5'>Post issues that are important to you and vote on what others have to say.</p>
                        </div>
                    </div>

                </div>
            </div>
        </>     
    )
}