import React from 'react'
import { useHistory } from "react-router-dom"
import { Route, Switch } from 'react-router-dom'

export default function Dashboard() {
    const { push } = useHistory()
    return (
        <div>
            <section>
                <button onClick={() => push('/newpotluckform')} className="btn add-btn">
                    Create potluck
                </button>
            </section>
            <section className="upcoming-potluck">
                <h2>
                    Name: {}
                </h2>
                <p>
                    Data: {}
                </p>
                <p>
                    Food List: {}
                </p>
                <p>
                    Location: {}
                </p>
                <p>
                    Invited: {}
                </p>
                <p>
                    Confirmed Attendence: {}
                </p>
                <p>
                    My food list: {}
                </p>
                <button onClick='' className="btn confirm-attendence">Confirm Attendence</button>
                <button onClick='' className="btn not-attending">Not Attending</button>

                {/* Only if it bellongs to the user */}
                <button onClick='' className="btn edit">Edit Your Potlucker</button>
                <button onClick='' className="btn delete">Delete Potlucker</button>

            </section>
            
        </div>
    )
}
