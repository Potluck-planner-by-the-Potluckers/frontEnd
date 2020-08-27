import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import { GETBYID } from '../store/reducer/reducer'
import { axiosWithAuth } from '../utils/axiosWithAuth'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { EDIT } from '../store/reducer/reducer'


export default function EditYourPotlucker() {
    //capture variable on the url
    const { id } = useParams()
    console.log(id)
    const { push } = useHistory()

    //be able to create action dispatch on this component
    const dispatch = useDispatch()
    // states
    const [editPotluck, setEditPotluck] = useState('Loading')
    const [user, setUser] = useState()
    //helper functions
    const handleChange = e => {
        e.preventDefault()

        //add change to the state
        setEditPotluck({
            ...editPotluck,
            [e.target.name]: e.target.value
        })
    }
    const onSubmit = e => {
        e.preventDefault()
        const formatedUser = {
            ...editPotluck,
            ...user
        }
        debugger

        //save edit to server
        axiosWithAuth().put(`/potlucks/potluck/${id}`, formatedUser)
            .then(resp => {
                console.log(`Create post request success-- ${resp.data}`)
                debugger
                //reset the form
                push('/dashboard')
            })
            .catch(err => {
                debugger
                console.error(`error in onSubmit createForm --- ${err}`)
            })
    }

    useEffect(()=> {
        // get all of the text of the potluck form
        axiosWithAuth().get('users/getuserinfo')
            .then((resp) => {
                setEditPotluck(resp.data.potlucks.filter(item => item.potluckid == id)[0])
                debugger
                
                setUser({
                    
                    user:{userid: resp.data.userid}
                })
            })
            .catch((err) => {
                console.error(err)
                debugger
            })
        // axiosWithAuth().get('users/getuserinfo')
        //     .then((resp) => {
                
        //         debugger
                
        //         setEditPotluck({
        //             ...editPotluck,
        //             user:{userid: resp.data.userid}
        //         })
        //     })
        //     .catch((err) => {
        //         console.error(err)
        //         debugger
        //     })
    }, [id])

    if(editPotluck === 'Loading') return <h1>Loading...</h1>
    return (
        <div className='container'>
            {/* return to dashboard button */}
            <button className="btn to-dashboard" onClick={() => push('/dashboard')}>Back to Dashboard</button>

            {/* Form title */}
            <h1>
                Edit the podluck "{editPotluck.name}"
            </h1>

            {/* edit form */}
            <form onSubmit={onSubmit}>
            <label htmlFor="name">Potluck Name</label>
                <input type="text" name="name" id='name' value={editPotluck.name} onChange={handleChange} required />

                <label htmlFor="description">Description</label>
                <input type="description" name="description" id='description' value={editPotluck.description} onChange={handleChange} />

                <label htmlFor="location">Location</label>
                <input type="text" name="location" id='location' value={editPotluck.location} onChange={handleChange} required />

                <label htmlFor="date">Date</label>
                <input type="date" name="date" id='date' value={editPotluck.date} onChange={handleChange} required />

                <label htmlFor="time">Time</label>
                <input type="time" name="time" id='time' value={editPotluck.time} onChange={handleChange} />

                {/* stretch goal: validate the form, and dissable button until valitation is successful */}
                <button className="btn submit" type='submit'>Submit</button>
            </form>
        </div>
    )
}
