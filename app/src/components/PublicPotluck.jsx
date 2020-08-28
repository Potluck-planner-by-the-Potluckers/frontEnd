import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { axiosWithAuth } from '../utils/axiosWithAuth'

export default function PublicPotluck() {
    const { push } = useHistory()
    const { id, urlPotluckName } = useParams()

    // /state
    const [publicPotluck, setPublicPotluck] = useState('loading')
    useEffect(() => {
        debugger
        axiosWithAuth().get('users/getuserinfo')
            .then((resp) => {
                debugger
                setPublicPotluck(resp.data.potlucks.filter(item => item.potluckid == id)[0])
                debugger
            })
            .catch((err) => {
                console.error(err)
                debugger
            })
    }, [])
    if (publicPotluck === 'loading') return <h1>loading ...</h1>
    return (
        <section className="upcoming-potluck">
            <h2>{publicPotluck.name}</h2>
            <p>{publicPotluck.date} : {publicPotluck.time}</p>
            <p>Location: {publicPotluck.location}</p>
            <p>{publicPotluck.description}</p>

            <button className="btn form-btn" onClick={() => {
                push(`/${publicPotluck.id}/${urlPotluckName}/confirmation`)
            }
            }>Confirm Attendance</button>
        </section>
    )
}
