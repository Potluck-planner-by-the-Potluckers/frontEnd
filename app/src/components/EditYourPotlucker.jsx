import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import { GETBYID } from '../store/reducer/reducer'
import { v4 as uuidv4 } from 'uuid'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { EDIT } from '../store/reducer/reducer'

//initial data
const initialInvitation = {
    id: uuidv4(),
    name: '',
    confirmedAttendence: false,

}

export default function EditYourPotlucker() {
    //capture variable on the url
    const { id } = useParams()

    //be able to create action dispatch on this component
    const dispatch = useDispatch()
    //filter redux store by id and return that object and set it it has  a new state in this local component
    const currentPotluckerData = useSelector(state => state.filter(aPotluck => { return aPotluck.id === parseInt(id) }))

    //states
    const [potluck, setPotluck] = useState(currentPotluckerData[0])
    const [newInvitation, setNewInvitation] = useState({
        id: uuidv4(),
        name: '',
        confirmedAttendence: false,

    })


    const { push } = useHistory()

    //helper functions
    const handleChange = e => {
        e.preventDefault()

        //add change to the state
        //Treat invited inputs differently
        const isInvitedInputs = e.target.id === 'invited'
        const isFoodListInput = e.target.name === "foodList"
        const isNewInvitation = e.target.name === "newInvitation"
        if (isInvitedInputs) {
            //variables
            const PotluckId = e.target.name
            const editedName = e.target.value

            //copy of invited list
            const copyOfPotluckInvited = potluck.invited
            //changing the copy of invited list 
            copyOfPotluckInvited.map((aInvited, index) => {
                // match index so you can update it
                if (aInvited.id === PotluckId) aInvited.name = editedName

                return aInvited
            })
            //reflecting the changes to the invites list on state
            setPotluck({
                ...potluck,
                invited: copyOfPotluckInvited
            })
        } else if (isNewInvitation) {
            // capture input state and save it to state
            setNewInvitation({
                ...newInvitation,
                name: e.target.value
            })
        } else if (isFoodListInput) {
            //separates all text that have , and gives them an unic index 
            let value = e.target.value.split(',')
            setPotluck({
                ...potluck,
                [e.target.name]: value
            })
        } else {
            setPotluck({
                ...potluck,
                [e.target.name]: e.target.value
            })
        }

    }
    const onSubmit = e => {
        e.preventDefault()
        //SHORT out data: foodList
        //separete the food when they have a , and give them their own indexes
        const newFormatedPotluck = {
            ...potluck,
            foodList: potluck.foodList.split(','),
        }
        //PUT REQUEST
        axios.put('/newpotluck', newFormatedPotluck)
            .then(resp => {
                console.log(`Create post request success-- ${resp.data}`)

                dispatch({ type: EDIT, payload: resp.data })

                //reset the form
                push('/dashboard')
            })
            .catch(err => console.error(`error in onSubmit createForm --- ${err}`))
    }
    const invitedInputs = () => {//change from many inputs to a single input like foodlist
        return potluck.invited.map((aInvited, index) => {
            return (
                <>
                    {/* Text inputs for every name on the invitation list */}
                    <input type="text" name={aInvited.id} id={'invited'} value={aInvited.name} onChange={handleChange} key={aInvited.id} />

                    {/* remove button */}
                    <button className="btn delete-btn" onClick={() => removeInvitation(aInvited.id)} key={index} type='button'>Delete Invitation</button>
                </>
            )
        })
    }
    const removeInvitation = (id) => {
        debugger
        let removedInvitation = potluck.invited
        removedInvitation = removedInvitation.filter(aInvited => aInvited.id !== id)
        setPotluck({
            ...potluck,
            invited: removedInvitation
        })
    }

    const addInvitation = () => {
        //adding new invited to the list
        const newInvitedAdded = potluck.invited.slice()
        newInvitedAdded.push(newInvitation)

        //overwriting state with the new invited included
        setPotluck(
            {
                ...potluck,
                invited: newInvitedAdded
            }
        )
        //reset the input
        setNewInvitation({
            ...newInvitation,
            name: '',
            id: uuidv4()
        })
    }

    return (
        <div className='container'>
            {/* return to dashboard button */}
            <button className="btn to-dashboard" onClick={() => push('/')}>Back to Dashboard</button>

            {/* Form title */}
            <h1>
                Edit the podluck "{potluck.potluckName}"
            </h1>

            {/* edit form */}
            <form onSubmit={onSubmit}>
                <label htmlFor="potluckName">Potluck Name</label>
                <input type="text" name="potluckName" id='potluckName' value={potluck.potluckName} onChange={handleChange} />


                <label htmlFor="date">Date</label>
                <input type="text" name="date" id='date' value={potluck.date} onChange={handleChange} />


                <label htmlFor="foodList">Foods List</label>
                <p>
                    Separete Foods with commans
                </p>
                <input type="text" name="foodList" id='foodList' value={potluck.foodList} onChange={handleChange} />


                <label htmlFor="location">Location</label>
                <input type="text" name="location" id='location' value={potluck.location} onChange={handleChange} />


                <label htmlFor="invited">Invitations</label>
                {invitedInputs()}

                <label htmlFor="newInvitation">New Invitations</label>
                <input type="text" name="newInvitation" id='newInvitation' value={newInvitation.name} onChange={handleChange} />
                <button className="btn add-btn" onClick={addInvitation} type='button'>Add has invited guest</button>

                {/* stretch goal: validate the form, and dissable button until valitation is successful */}
                <button className="btn submit" type='submit'>Submit</button>
            </form>
        </div>
    )
}
