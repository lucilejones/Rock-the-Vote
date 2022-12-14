import React, { useState } from 'react'

const initInputs = {
    title: "",
    description: ""
}

export default function IssueForm(props){
    const [inputs, setInputs] = useState(initInputs)
    const { addIssue } = props

    function handleChange(e){
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSubmit(e){
        e.preventDefault()
        addIssue(inputs)
        setInputs(initInputs)
    }

    const { title, description } = inputs

    return (
        <form onSubmit={handleSubmit}>
            <input
                className='form-control my-2'
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
                placeholder="title"
            />
            <textarea
                className='form-control my-2'
                name="description"
                value={description}
                onChange={handleChange}
                placeholder="description"
            />
            <button className='btn bg-white'>Add Issue</button>
        </form>
    )
}