import React from 'react'

export default function AuthForm(props){
    const {
        handleChange,
        handleSubmit,
        btnText,
        errMsg,
        inputs: {
            username,
            password
        }
    } = props

    return(
        <form onSubmit={handleSubmit}>
            <input
                className='form-control my-2'
                type="text"
                value={username}
                name="username"
                onChange={handleChange}
                placeholder="username"
            />
            <input
                className='form-control my-2'
                type="text"
                value={password}
                name="password"
                onChange={handleChange}
                placeholder="password"
            />
            <button className='btn bg-light'>{ btnText }</button>
            <p style={{color: "red"}}>{errMsg}</p>
        </form>
    )
}