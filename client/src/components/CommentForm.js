import React, { useState } from 'react'

const initInputs = {
    text: ""
}

export default function CommentForm(props){
    const [inputs, setInputs] = useState(initInputs)
    const { _id, addComment } = props
    // console.log(_id)

    function handleChange(e){
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSubmit(e){
        e.preventDefault()
        console.log(inputs)
        addComment(_id, inputs)
        setInputs(initInputs)
    }

    const { text } = inputs
    return(
        <form onSubmit={handleSubmit}>
            <label>Make a new comment: </label>
            <textarea 
                name="text"
                value={text}
                onChange={handleChange}
                placeholder="Type text here."
            />
            <button>Add Comment</button>
        </form>
    )
}