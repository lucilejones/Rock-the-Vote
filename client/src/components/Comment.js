import React from 'react'

export default function Comment(props){
    const {text, user } = props
    console.log(user.username)
    

    return (
        <div>
            <p>{text}</p>
            <p>posted by: {user.username}</p>
        </div>
    )
}