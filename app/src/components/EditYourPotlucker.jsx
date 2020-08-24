import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useHistory, useParams} from 'react-router-dom'

// redux
import { useDispatch } from 'react-redux'
import { EDIT } from '../store/reducer/reducer'

export default function EditYourPotlucker() {
    //capture variable on the url
    const {aPotluck} = useParams()
    const [potluck, setPotluck] = useState(aPotluck)
    const dispatch = useDispatch()
    const {push} = useHistory()

    const handleChange = e => {
        e.preventDefault()
        e.presist()

        //add change to the state
        setPotluck({
            ...potluck,
            [e.target.name]: [e.target.value]
        })
    }
    const onSubmit = e => {
        e.preventDefault()
        //SHORT out data: foodList, invited
        const newFormatedPotluck = {
            ...potluck,
            foodList: potluck.foodList.split(','),
            invited: {
                name: potluck.invited.split(','),
                confirmedAttendence: false,
            },
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
                <p>
                    Separete people with commans
                </p>
                <input type="text" name="invited" id='Invitations' value={potluck.invited} onChange={handleChange} />

                {/* stretch goal: validate the form, and dissable button until valitation is successful */}
                <button className="btn submit" type='submit'>Submit</button>
            </form>
        </div>
    )
}
