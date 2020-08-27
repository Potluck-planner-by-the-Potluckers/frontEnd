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
                    axios.get('https://viriditymoon-buildweek.herokuapp.com/logout')
                        .then(() => {
                            debugger
                            push('/login')
                        })
                        .catch(err => {
                            console.error(err)
                            debugger
                        })
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
