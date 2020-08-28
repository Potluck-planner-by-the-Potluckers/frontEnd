import React, { useState, useEffect } from 'react'
import { Form } from 'semantic-ui-react'

const initialState = {
    name: '',
    type: '',
    attendeenname: '',
}

export default function ConfirmationForm() {
    // states
    const [attendess, setAttendess] = useState(initialState)
    
    // helper variables
    const options = [
        { key: 'e', text: 'Entree', value: 'Entree' },
        { key: 'dt', text: 'Dessert', value: 'Dessert' },
        { key: 'ds', text: 'Drinks', value: 'drinks' },
    ]

    // helper functions
    const onSubmit = (e) => {
        e.preventDefault()


    }
    const handleChange = (e) => {
        const { value, name } = e.target
        setAttendess({
            ...attendess,
            [name]:value
        })

    }

    return (
        <div className='container confirmation-form-container'>
            <h1>Confirmation Page</h1>
            <Form>
                <Form.Input
                    fluid label='Your Name'
                    placeholder='Name'
                    onChange={handleChange}
                    value={attendess.attendeenname}
                    name='attendeenname'
                />
                <Form.Input
                    fluid label='Food Item'
                    placeholder='Food Item'
                    onChange={handleChange}
                    value={attendess.name}
                    name='name'

                />
                <Form.Group widths='equal'>
                    <Form.Select
                        fluid
                        label='Food Item Type'
                        options={options}
                        placeholder='Food Item Type'
                        onChange={handleChange}
                    name='type'
                    />
                    <Form.Group >
                        <Form.Button fluid type='button' onClick={''}>Add more</Form.Button>
                        <Form.Button fluid type='button' onClick={''}>Remove</Form.Button>
                    </Form.Group>

                </Form.Group>
                
                <Form.Button>Submit</Form.Button>
            </Form>
        </div>
    )
}
