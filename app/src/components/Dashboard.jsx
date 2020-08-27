import React from 'react'
import { useHistory } from "react-router-dom"
import Potlucks from './Potlucks'
export default function Dashboard() {
    const { push } = useHistory()
    return (
        <div className="Create">
            <section>
                <button onClick={() => push('/newpotluckform')} className="btn add-btn">
                    Create potluck
                </button>
            </section>
        <div className="Potlucks">
            <Potlucks/>
            </div>   
        </div>
    )
}
