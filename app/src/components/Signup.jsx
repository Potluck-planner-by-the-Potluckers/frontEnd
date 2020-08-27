import React, {useState} from 'react'
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'
import axios from 'axios'
import { useHistory } from "react-router-dom"

const initialState ={
    username: '',
    password: '',
}

export default function Signup() {
    const { push } = useHistory()

    // states
    const [newUser, setNewUser] =useState(initialState)
    // helping functions
    const handleChange = (e) => {
        //update the state with the input from users
        const {name, value} = e.target
        setNewUser({
            ...newUser,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        //get state data to the server, and move them to the login page
        debugger
        axios.post('https://viriditymoon-buildweek.herokuapp.com/createnewuser', newUser)
            .then(resp => {
                debugger
                console.log(resp.data)
                push('/')
            })
            .catch(err => {debugger;console.error(`Error on signup page --- ${err}`)})
    }
    
    
    return (
        <div className='container'>
                <Form className="signup" onSubmit={handleSubmit}>
                    <Form.Input
                        icon='user'
                        iconPosition='left'
                        label='Username'
                        placeholder='Username'
                        onChange={handleChange}
                        value={newUser.username}
                        name='username'
                    />
                    <Form.Input
                        icon='lock'
                        iconPosition='left'
                        label='Password'
                        type='password'
                        onChange={handleChange}
                        value={newUser.password}
                        name='password'
                    />

                    <Button content='Singup' primary type='submit' />
                </Form>
        </div>
    )
}
