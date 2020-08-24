import React from 'react'

export default function Dashboard() {
    return (
        <div>
            <section>
                <button onClick='' className="btn add-btn">
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
            </section>
        </div>
    )
}
