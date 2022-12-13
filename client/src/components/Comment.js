import React from 'react'

export default function Comment(props){
    const {text, commentedBy } = props
    // console.log(commentedBy.username)
    

    return (
        <div>
            <p>{commentedBy.username}:</p>
            <p>{text}</p>
        </div>
    )
}