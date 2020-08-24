import React from 'react'

// redux
import { useSelector } from 'react-redux'


export default function CreatePotLuckForm() {
    const { potluckName, date, foodList, location, invited, myFoodList } = useSelector(state => state)

    const handleChange = e => {
        e.preventDefault()


    }
    return (
        <div>
            <form action="onSubmit">
                <label htmlFor="potluckName">Potluck Name</label>
                <input type="text" name="potluckName" id='potluckName' value={potluckName} onChange={handleChange} />


                <label htmlFor="date">Date</label>
                <input type="text" name="date" id='date' value={date} onChange={handleChange} />


                <label htmlFor="foodList">Foods List</label>
                <input type="text" name="foodList" id='foodList' value={foodList} onChange={handleChange} />


                <label htmlFor="location">Location</label>
                <input type="text" name="location" id='location' value={location} onChange={handleChange} />


                <label htmlFor="Invitations">Invitations</label>
                <input type="text" name="Invitations" id='Invitations' value={invited.name} onChange={handleChange} />

                <button className="btn submit" type='submit'>Submit</button>
            </form>
        </div>
    )
}
