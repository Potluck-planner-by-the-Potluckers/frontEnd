import React, { useState } from 'react'
import axios from 'axios'
import {axiosWithAuth} from '../utils/axiosWithAuth'
import { useHistory } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid' //generates :"f7b8b94e-9cff-46a2-a740-40b8fac4ec09" unic
// redux
import { useDispatch } from 'react-redux'
import { ADD } from '../store/reducer/reducer'

// const intialForm = {
//     potluckName: '',
//     date: '',
//     foodList: '',
//     location: '',
//     invited: '',
//     myFoodList: '',
// }
const intialForm = {
    name: '',
    description: '',
    location: '',
    date: '',
    time: '',
}

export default function CreatePotluckForm() {
    //states
    const [newPotluck, setNewPotluck] = useState(intialForm)

    const dispatch = useDispatch()
    const { push } = useHistory()

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
        axiosWithAuth().post('/potlucks/potluck', newPotluck, {
            headers: { Authorization: localStorage.getItem("token") },
        })
            .then(resp => {
                console.log(`Create post request success-- ${resp.data}`)
                //update state
                dispatch({ type: ADD, payload: {newPotluck:resp.data} })
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
            <h1>
                Create New Potluck
</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor="name">Potluck Name</label>
                <input type="text" name="name" id='name' value={newPotluck.name} onChange={handleChange} required/>

                <label htmlFor="description">Description</label>
                <input type="description" name="description" id='description' value={newPotluck.description} onChange={handleChange} />

                <label htmlFor="location">Location</label>
                <input type="text" name="location" id='location' value={newPotluck.location} onChange={handleChange} required/>

                <label htmlFor="date">Date</label>
                <input type="date" name="date" id='date' value={newPotluck.date} onChange={handleChange} required/>

                <label htmlFor="time">Time</label>
                <input type="time" name="time" id='time' value={newPotluck.time} onChange={handleChange} min="09:00" max="18:00" required/>

                {/* stretch goal: validate the form, and dissable button until valitation is successful */}
                <button className="btn submit" type='submit'>Submit</button>
            </form>
        </div>
    )
}
