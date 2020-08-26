import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid' //generates :"f7b8b94e-9cff-46a2-a740-40b8fac4ec09" unic
// redux
import { useDispatch } from 'react-redux'
import { ADD } from '../store/reducer/reducer'

const intialForm = {
    id: uuidv4(),
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
        
        // make the long string into a list of by separting name by ','
        const guestNames = newPotluck.invited.split(',')
        //add confirmedAttendence to the list
        const formatedInvitationList = guestNames.map(name => {
            return {
                name: name,
                confirmedAttendence: false,
            }
        })

        //set new formated state like the server wants
        const newFormatedPotluck = {
            ...newPotluck,
            foodList: newPotluck.foodList.split(','),
            invited: formatedInvitationList,
        }

        //talk to the server
        debugger
        dispatch({ type: ADD, payload: {newFormatedPotluck} })
        setNewPotluck(intialForm)
        push('/')
        debugger
        //POST REQUEST
        // axios.post('/newpotluck', newFormatedPotluck)
        //     .then(resp => {
        //         console.log(`Create post request success-- ${resp.data}`)
        //         dispatch({ type: ADD, payload: resp.data })
        //         //reset the form
        //         setNewPotluck(intialForm)
        //     })
        //     .catch(err => console.error(`error in onSubmit createForm --- ${err}`))

    }


    return (
        <div className='container'>
            {/* return to dashboard button */}
            <button className="btn to-dashboard" onClick={() => push('/')}>Back to Dashboard</button>

            {/* Form title */}
            <h1>
                Create New Potluck
</h1>
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
