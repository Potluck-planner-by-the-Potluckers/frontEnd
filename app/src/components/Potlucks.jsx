import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ADD } from '../store/reducer/reducer'

export default function Potlucks() {
    //states
    const potluckList = useSelector(state => state)

    const renderPotluck = () => {
        return potluckList.map(aPotluck => {
            return (
                <>
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
                            if(isLastNameOnList) return `${anInvited.name}`

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
                    <button onClick='' className="btn edit">Edit Your Potlucker</button>
                    <button onClick='' className="btn delete">Delete Potlucker</button>
                </>
            )
        })

    }

    return (
        <div className='container potlucks-container'>
            <section className="upcoming-potluck">
                {renderPotluck()}

            </section>
            <section className="invited-potlucks">
                {/* Can make the button dissable if they already click on it */}
                <button onClick='' className="btn confirm-attendence">Confirm Attendence</button>
                <button onClick='' className="btn not-attending">Not Attending</button>
            </section>
        </div>
    )
}
