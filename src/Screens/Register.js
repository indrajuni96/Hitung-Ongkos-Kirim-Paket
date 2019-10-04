import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import { Alert, Form, Input, Button } from 'reactstrap';

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            buttonDisabled: false,
            message: '',
            visible: true
        }

        this.onDismiss = this.onDismiss.bind(this);
    }

    onDismiss() {
        this.setState({ visible: false });
    }

    registerResult = () => {
        if (this.state.message === "success adding new user") {
            return (
                <>
                    <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss}>
                        {this.state.message}
                    </Alert>
                    <Redirect to="/" />
                </>
            )
        } else if (this.state.message === 'Username already exist.' || this.state.message === "email already exist") {
            return (
                <>
                    <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                        {this.state.message}
                    </Alert>
                </>
            )
        }
    }

    inputOnChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmitHandler = (e) => {
        e.preventDefault()
        this.setState({ buttonDisabled: true })

        var url = 'http://localhost:4000/users/register'
        var payload = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post(url, payload)
            .then(res => {
                console.log(res)
                let message = res.data.message
                if (message === "success adding new user") {
                    this.setState({
                        buttonDisabled: true,
                        message: "success adding new user"
                    })
                } else {
                    this.setState({
                        buttonDisabled: false,
                        message: "email already exist"
                    })
                }
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    buttonDisabled: false,
                    message: "email already exist"
                })
            })
    }

    render() {
        return (
            <>
                <Form onSubmit={this.onSubmitHandler}>
                    <Input type="text" name="email" placeholder="Email..." value={this.state.email} onChange={this.inputOnChangeHandler} />
                    <Input type="password" name="password" placeholder="Password..." value={this.state.password} onChange={this.inputOnChangeHandler} />
                    <Button disabled={this.state.buttonDisabled}>Login </Button>
                </Form>

                <p>Already have an account? <Link to='/'>Login Here</Link> </p>
                {this.registerResult()}
            </>
        )
    }


}

export default Register