import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import { axiosWithAuth } from '../utils/axiosWithAuth'

export default function Potlucks() {
    //helper variables
    const { push } = useHistory()

    //states
    const [potluckList, setpotluckList] = useState()

    //helper functions

    const renderPotlucks = () => {
        //check if there is potluck on the list
        debugger
        const isListNotHere = !potluckList

        debugger
        return isListNotHere ?
            <p>Start hosting a new Potluck</p>
            :
            potluckList.map(aPotluck => {
                //make potluck name url friendly
                //lowercase
                //nospace

                let urlPotluckName = aPotluck.name.replace(/\s+/g, '')
                urlPotluckName = urlPotluckName.toLowerCase()

                return (
                    <section className="upcoming-potluck" key={aPotluck.potluckid}>
                        <h2>{aPotluck.name}</h2>
                        <p>{aPotluck.date} : {aPotluck.time}</p>
                        <p>Location: {aPotluck.location}</p>
                        <p>{aPotluck.description}</p>

                        {/* Only if it bellongs to the user */}
                        <button onClick={() => push(`/edityourpotlock/${aPotluck.potluckid}`)} className="btn edit">Edit Your Potlucker</button>
                        <button onClick={() => {deleteAPotluck(aPotluck.potluckid)}} className="btn delete-btn">Delete Potlucker</button>
                        <button className="btn public-btn" onClick={() => {push(`/${aPotluck.potluckid}/${urlPotluckName}`)}}>See live potluck</button>
                    </section>
                )
            })

    }
    const deleteAPotluck = (id) => {
        axiosWithAuth().delete(`/potlucks/potluck/${id}`)
            .then(() => {
                setpotluckList(
                    potluckList.filter(item => item.potluckid !== id)
                )
            })
            .catch((err) => {
                console.error(err)
            }
            )
    }
    

    useEffect(() => {
        axiosWithAuth().get('users/getuserinfo')
            .then((resp) => {
                setpotluckList(resp.data.potlucks)
                debugger
            })
            .catch((err) => {
                console.error(err)
                debugger
            })
    }, [])


    return (
        <div className='container potlucks-container'>
            <h1>Welcome to the Dashboard</h1>

            <h2>Your Hosted Potlucks</h2>
            {renderPotlucks()}

        </div>
    )
}
