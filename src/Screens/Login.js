import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import ls from 'local-storage'
import { Alert, Form, Input, Button } from 'reactstrap';

class Login extends Component {
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

    loginInvalidMessage = () => {
        if (this.state.message === 'loginFailed') {
            return (
                <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                    Invalid username/password
                </Alert>
            )
        } else if (this.state.message === 'loginSuccess') {
            return (
                <>
                    <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss}>
                        Login Success
                </Alert>
                    <Redirect to='./dashboard' />
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

        var url = 'http://localhost:4000/users/login'
        var payload = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post(url, payload)
            .then(res => {
                console.log(res)
                let status = res.data.status
                if (status === 200) {
                    ls.set('token', res.data.data.token)
                    this.setState({
                        buttonDisabled: true,
                        message: 'loginSuccess'
                    })
                } else {
                    this.setState({
                        buttonDisabled: false,
                        message: 'loginFailed'
                    })
                }
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    buttonDisabled: false,
                    message: 'loginFailed'
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

                <p>Don't have an account? <Link to='/register'>ResgisterHere</Link> </p>
                {this.loginInvalidMessage()}
            </>
        )
    }


}

export default Login