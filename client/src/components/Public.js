import React, { useContext, useEffect } from 'react'
import IssueList from './IssueList'
// import Issue from './Issue'
import { UserContext } from '../context/UserProvider'

export default function Public(){
    const { issues, getAllIssues } = useContext(UserContext)

    useEffect(() => {
        getAllIssues()
    }, [])

    return (
        <div>
            <h3>The full list of issues</h3>
            <IssueList issues={issues}/>
        </div>
        
    )
}