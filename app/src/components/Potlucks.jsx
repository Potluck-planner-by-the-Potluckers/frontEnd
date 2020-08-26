import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DELETE } from '../store/reducer/reducer'
import { useHistory } from "react-router-dom"

export default function Potlucks() {
    const { push } = useHistory()
    const dispatch = useDispatch()

    //states
    const potluckList = useSelector(state => state)

    const renderPotlucks = () => {
        const isListNotHere = !(potluckList[0].potluckName)
        if(undefined) console.log('undefined')
        if(!undefined) console.log('!undefined')
        
        
        debugger
        return isListNotHere ? <p>Start hosting a new Potluck</p> : potluckList.map(aPotluck => {
            return (
                <section className="upcoming-potluck">
                    <h2>
                        Potluck Name: {aPotluck.potluckName}
                    </h2>
                    <p>
                        Date: {aPotluck.date}
                    </p>
                    <p>
                        Food List: {aPotluck.foodList}
                    </p>
                    <p>
                        Location: {aPotluck.location}
                    </p>
                    <p>
                        Invited: {aPotluck.invited.map((anInvited, index) => {
                        const lastIndex = (aPotluck.invited.length - 1)
                        const isLastNameOnList = lastIndex === index

                        //return the last name without a comman , so the list don't look uncompleted
                        if (isLastNameOnList) return `${anInvited.name}`

                        //return name on the invitation list
                        return `${anInvited.name},`
                    })}
                    </p>
                    <p>
                        Invited Confirmed Attendence: {aPotluck.myFoodList}
                    </p>
                    <p>
                        My food list: {aPotluck.myFoodList}
                    </p>

                    {/* Only if it bellongs to the user */}
                    <button onClick={() => push(`/edityourpotlock/${aPotluck.id}`)} className="btn edit">Edit Your Potlucker</button>
                    <button onClick={() => {
                        dispatch({ type: DELETE, payload: { id: aPotluck.id } })
                    }
                    } className="btn delete">Delete Potlucker</button>
                </section>
            )
        })

    }
    const invitedPotlucks = () => {
        return (
            <section className="invited-potlucks">
                {/* Can make the button dissable if they already click on it */}
                <button onClick='' className="btn confirm-attendence">Confirm Attendence</button>
                <button onClick='' className="btn not-attending">Not Attending</button>
            </section>
        )
    }
    return (
        <div className='container potlucks-container'>
            <h1>Welcome to the Dashboard</h1>

            <h2>Your Hosted Potlucks</h2>
            {renderPotlucks()}

            <h2>Invitations To Others Potlucks</h2>
            {invitedPotlucks()}
        </div>
    )
}
