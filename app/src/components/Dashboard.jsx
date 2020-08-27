import React from 'react'
import { useHistory } from "react-router-dom"
import Potlucks from './Potlucks'
import axios from 'axios'


export default function Dashboard() {
    const { push } = useHistory()
    return (
        <div>
            <section>
                <button className="btn logout-btn" onClick={() => {
                    localStorage.removeItem('token')
                    push('/')
                }
                }>Logout</button>
                <button onClick={() => push('/newpotluckform')} className="btn add-btn">
                    Create potluck
                </button>
            </section>
            <Potlucks/>
            
        </div>
    )
}
