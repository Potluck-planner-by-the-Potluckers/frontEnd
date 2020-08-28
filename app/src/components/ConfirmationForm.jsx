import React from 'react'
import { Form } from 'semantic-ui-react'

const options = [
    { key: 'e', text: 'Entree', value: 'entree' },
    { key: 'dt', text: 'Dessert', value: 'dessert' },
    { key: 'ds', text: 'Drinks', value: 'drinks' },
]
export default function ConfirmationForm() {
    return (
        // <div className='container confirmation-form-container'>
        //     <h1>Confirmation Page</h1>
        <Form>
            <Form.Input fluid label='Your Name' placeholder='Name' />
            <Form.Input fluid label='Food Item' placeholder='Food Item' />
            <Form.Group widths='equal'>
                <Form.Select
                    fluid
                    label='Food Item Type'
                    options={options}
                    placeholder='Food Item Type'
                />
                <Form.Group >
                    <Form.Button fluid type='button'>Add more</Form.Button>
                    <Form.Button fluid type='button'>Remove</Form.Button>
                </Form.Group>

            </Form.Group>
            <Form.Checkbox label='I agree to the Terms and Conditions' required />
            <Form.Button>Submit</Form.Button>
        </Form>
        /* </div> */
    )
}
