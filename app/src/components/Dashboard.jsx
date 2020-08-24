import React from 'react'
import { useHistory } from "react-router-dom"
import { Route, Switch } from 'react-router-dom'
import Potlucks from './Potlucks'
export default function Dashboard() {
    const { push } = useHistory()
    return (
        <div>
            <section>
                <button onClick={() => push('/newpotluckform')} className="btn add-btn">
                    Create potluck
                </button>
            </section>
            <Potlucks/>
            
        </div>
    )
}
