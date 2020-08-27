import React, {useState} from 'react'
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'
import { useHistory } from "react-router-dom"
import axios from 'axios'

const initialState ={
    username: '',
    password: '',
}

export default function Login() {
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
        axios.post('https://viriditymoon-buildweek.herokuapp.com/login', newUser)
            .then(resp => {
                debugger
                console.log(resp.data)
                push('/dashboard')
            })
            .catch(err => {debugger;console.error(`Error on signup page --- ${err}`)})
    }
    // gab gab "69e1ba50-da85-4c3a-b107-b27a295a161a"
    return (
        <div className='container login-container'>
            <section className="login">
                <h1>Login Page</h1>
                <Segment placeholder>
                    <Grid columns={2} relaxed='very' stackable>
                        <Grid.Column>
                            <Form onSubmit={handleSubmit}>
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

                                <Button content='Login' primary type='submit'/>
                            </Form>
                        </Grid.Column>

                        <Grid.Column verticalAlign='middle'>
                            <Button content='Sign up' icon='signup' size='big' onClick={() => {
                                push('/signup')
                            }
                            }/>
                        </Grid.Column>
                    </Grid>

                    <Divider vertical>Or</Divider>
                </Segment>
            </section>
        </div>
    )
}
