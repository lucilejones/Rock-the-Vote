import React, { useContext, useEffect } from 'react'
import IssueForm from './IssueForm.js'
import IssueList from './IssueList.js'
// import Issue from './Issue.js'
import { UserContext } from '../context/UserProvider.js'

export default function Profile(){
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
            <h1>Welcome {username}!</h1>
            <h3>Add an issue</h3>
            <IssueForm addIssue={addIssue}/>
            <h3>Issues you've added</h3>
            <IssueList issues={issues}/>
        </div>
    )
}