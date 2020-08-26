import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function PublicPotluck() {
    const { push } = useHistory()
    const { id, urlPotluckName } = useParams()

    //get the current potluck into the state
    const publicPotluck = useSelector(state => state.filter(aPotluck => aPotluck.id == id
    ))[0]
    debugger

    return (
        <section className="upcoming-potluck">
            <h1>
                Potluck Name: {publicPotluck.potluckName}
            </h1>
            <p>
                Date: {publicPotluck.date}
            </p>
            <p>
                Food List: {publicPotluck.foodList}
            </p>
            <p>
                Location: {publicPotluck.location}
            </p>
            <p>
                Invited: {publicPotluck.invited.map((anInvited, index) => {
                const lastIndex = (publicPotluck.invited.length - 1)
                const isLastNameOnList = lastIndex === index

                //return the last name without a comman , so the list don't look uncompleted
                if (isLastNameOnList) return `${anInvited.name}`

                //return name on the invitation list
                return `${anInvited.name},`
            })}
            </p>
            <p>
                Invited Confirmed Attendence: {publicPotluck.myFoodList}
            </p>
            <p>
                My food list: {publicPotluck.myFoodList}
            </p>

            <button className="btn form-btn" onClick={() => {
                push(`/${publicPotluck.id}/${urlPotluckName}/confirmation`)
            }
            }>Confirm Attendance</button>
        </section>
    )
}
