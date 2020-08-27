import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { useHistory } from 'react-router-dom'
// redux
import { useDispatch } from 'react-redux'
import { ADD } from '../store/reducer/reducer'

// const intialForm = {
//     name: '',
//     description: '',
//     location: '',
//     date: '',
//     time: '',
//     user: '',
// }

const intialForm = {
    name: 'New Potluck',
    description: 'This is the description',
    location: 'Jupiter',
    date: '1999-04-26',
    time: '07:00',
}

export default function CreatePotluckForm() {
    //states
    const [newPotluck, setNewPotluck] = useState(intialForm)

    //helper functions
    const dispatch = useDispatch()
    const { push } = useHistory()

    //helper functions
    const handleChange = e => {
        e.preventDefault()

        //add change to the state
        setNewPotluck({
            ...newPotluck,
            [e.target.name]: e.target.value
        })
    }
    const onSubmit = e => {
        e.preventDefault()
 
        // Post a New Potluck to server 
        // dispatch({ type: ADD, payload: {newPotluck} })
        // setNewPotluck(intialForm)
        // push('/dashboard')
        axiosWithAuth().post('/potlucks/potluck', newPotluck)
            .then(resp => {
                console.log(`Create post request success-- ${resp.data}`)
                //update state
                dispatch({ type: ADD, payload: { newPotluck: resp.data } })
                //reset the form
                setNewPotluck(intialForm)
                debugger
                //go to daskboard
                push('/dashboard')
            })
            .catch(err => {
                console.error(`error in onSubmit createForm --- ${err}`)
                debugger
            })

    }


    return (
        <div className='container'>
            {/* return to dashboard button */}
            <button className="btn to-dashboard" onClick={() => push('/dashboard')}>Back to Dashboard</button>

            {/* Form title */}
            <h1>Create New Potluck</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor="name">Potluck Name</label>
                <input type="text" name="name" id='name' value={newPotluck.name} onChange={handleChange} required />

                <label htmlFor="description">Description</label>
                <input type="description" name="description" id='description' value={newPotluck.description} onChange={handleChange} />

                <label htmlFor="location">Location</label>
                <input type="text" name="location" id='location' value={newPotluck.location} onChange={handleChange} required />

                <label htmlFor="date">Date</label>
                <input type="date" name="date" id='date' value={newPotluck.date} onChange={handleChange} required />

                <label htmlFor="time">Time</label>
                <input type="time" name="time" id='time' value={newPotluck.time} onChange={handleChange} />

                {/* stretch goal: validate the form, and dissable button until valitation is successful */}
                <button className="btn submit" type='submit'>Submit</button>
            </form>
        </div>
    )
}
