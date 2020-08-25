import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import { GETBYID } from '../store/reducer/reducer'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { EDIT } from '../store/reducer/reducer'

export default function EditYourPotlucker() {
    //capture variable on the url
    const { id } = useParams()

    //be able to create action dispatch on this component
    const dispatch = useDispatch()
    // const currentPotluckerData = dispatch({type: GETBYID, payload: {id: currentPotlucID}})
    //filter redux store by id and return that object and set it it has  a new state in this local component
    //return an array of the object
    // let currentPotluckerFromList = useSelector( state => state.filter(aPotluck => {return aPotluck.id === parseInt(id)}))
    // currentPotluckerFromList =currentPotluckerFromList.map(aPotluck => {

    //     return aPotluck
    // })
    //[0]takes it away from the list array
    const currentPotluckerData = useSelector(state => state.filter(aPotluck => { return aPotluck.id === parseInt(id) }))
    const [potluck, setPotluck] = useState(currentPotluckerData[0])
    const { push } = useHistory()
    const handleChange = e => {
        e.preventDefault()

        //add change to the state
        //Treat invited inputs differently
        const isInvitedInputs = e.target.id === 'invited'
        const isFoodList = e.target.name === "foodList"
        if (isInvitedInputs) {
            //variables
            const PotluckId = parseInt(e.target.name) 
            const editedName = e.target.value
            
            //copy of invited list
            const copyOfPotluckInvited = potluck.invited
            //changing the copy of invited list 
            copyOfPotluckInvited.map((aInvited, index) => {
                // match index so you can update it
                if(aInvited.id === PotluckId)  aInvited.name = editedName

                return aInvited
            })
            //reflecting the changes to the invites list on state
            setPotluck({
                ...potluck,
                invited: copyOfPotluckInvited
            })
        } 
        else if(isFoodList){
            debugger
            const value = [e.target.value].split(',')
            setPotluck({
                ...potluck,
                [e.target.name]: value
            })
        }
        else {
            setPotluck({
                ...potluck,
                [e.target.name]: [e.target.value]
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
    const invitedInputs = (params) => {
        return potluck.invited.map((aInvited, index) => {
            return (
                <input type="text" name={aInvited.id} id={'invited'} value={aInvited.name} onChange={handleChange} key={aInvited.id} />
            )
        })
    }
    
    return (
        <div className='container'>
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

                {/* stretch goal: validate the form, and dissable button until valitation is successful */}
                <button className="btn submit" type='submit'>Submit</button>
            </form>
        </div>
    )
}
