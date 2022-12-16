import React, { useContext, useEffect } from 'react'
import IssueList from './IssueList'
// import Issue from './Issue'
import { UserContext } from '../context/UserProvider'

export default function Public(){
    const { 
        issues, 
        getAllIssues } = useContext(UserContext)

    useEffect(() => {
        getAllIssues()
    }, [])

    return (
        <div>
            <h2 className='text-center pt-3'>The full list of Rock the Vote issues</h2>
            <IssueList issues={issues}/>
        </div>
        
    )
}