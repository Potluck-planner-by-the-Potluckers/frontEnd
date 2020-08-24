import React from 'react'

export default function CreatePotLuckForm() {
    return (
        <div>
            <form action="onSubmit">
                <label htmlFor="potluckName">Potluck Name</label>
                <input type="text" name="potluckName" id='potluckName' value={} onChange={} />


                <label htmlFor="date">Date</label>
                <input type="text" name="date" id='date' value={} onChange={} />


                <label htmlFor="foodList">Foods List</label>
                <input type="text" name="foodList" id='foodList' value={} onChange={} />


                <label htmlFor="location">Location</label>
                <input type="text" name="location" id='location' value={} onChange={} />


                <label htmlFor="Invitations">Invitations</label>
                <input type="text" name="Invitations" id='Invitations' value={} onChange={} />


            </form>
        </div>
    )
}
