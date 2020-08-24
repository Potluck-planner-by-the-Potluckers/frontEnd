import React, { useState } from 'react'
import axios from 'axios'
// redux
import { useDispatch } from 'react-redux'
import { ADD } from '../store/reducer/reducer'

const intialForm = {
    potluckName: '',
    date: '',
    foodList: '',
    location: '',
    invited: '',
    myFoodList: '',
}

export default function CreatePotluckForm() {
    //states
    const [newPotluck, setNewPotluck] = useState(intialForm)

    const dispatch = useDispatch()

    const handleChange = e => {
        e.preventDefault()
        e.presist()

        //add change to the state
        setNewPotluck({
            ...newPotluck,
            [e.target.name]: [e.target.value]
        })
    }
    const onSubmit = e => {
        e.preventDefault()
        //SHORT out data: foodList, invited
        const newFormatedPotluck = {
            ...newPotluck,
            foodList: newPotluck.foodList.split(','),
            invited: {
                name: newPotluck.invited.split(','),
                confirmedAttendence: false,
            },
        }
        //POST REQUEST
        axios.post('/newpotluck', newFormatedPotluck)
            .then(resp => {
                console.log(`Create post request success-- ${resp.data}`)
                dispatch({ type: ADD, payload: resp.data })
                //reset the form
                setNewPotluck(intialForm)
            })
            .catch(err => console.error(`error in onSubmit createForm --- ${err}`))

    }


    return (
        <div className='container'>
            <form onSubmit={onSubmit}>
                <label htmlFor="potluckName">Potluck Name</label>
                <input type="text" name="potluckName" id='potluckName' value={newPotluck.potluckName} onChange={handleChange} />


                <label htmlFor="date">Date</label>
                <input type="text" name="date" id='date' value={newPotluck.date} onChange={handleChange} />


                <label htmlFor="foodList">Foods List</label>
                <p>
                    Separete Foods with commans
                </p>
                <input type="text" name="foodList" id='foodList' value={newPotluck.foodList} onChange={handleChange} />


                <label htmlFor="location">Location</label>
                <input type="text" name="location" id='location' value={newPotluck.location} onChange={handleChange} />


                <label htmlFor="invited">Invitations</label>
                <p>
                    Separete people with commans
                </p>
                <input type="text" name="invited" id='Invitations' value={newPotluck.invited} onChange={handleChange} />

                {/* stretch goal: validate the form, and dissable button until valitation is successful */}
                <button className="btn submit" type='submit'>Submit</button>
            </form>
        </div>
    )
}
