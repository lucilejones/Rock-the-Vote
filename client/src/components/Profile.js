import React, { useContext, useEffect } from 'react'
import IssueForm from './IssueForm.js'
import IssueList from './IssueList.js'
// import Issue from './Issue.js'
import { UserContext } from '../context/UserProvider.js'

export default function Profile() {
    const {
        user: {
            username
        },
        addIssue,
        getUserIssues,
        issues
    } = useContext(UserContext)

    useEffect(() => {
        getUserIssues()
    }, [])

    return (
        <div>
            <div className='container bg-light py-3 my-3'>
                <h1>Welcome {username}!</h1>
                <p>Add an issue</p>
                <IssueForm addIssue={addIssue} />
            </div>

            <h3 className='text-center'>Issues you've added</h3>
            <IssueList issues={issues} />
        </div>
    )
}