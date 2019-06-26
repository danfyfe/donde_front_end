import React from 'react'
import { Component, Redirect } from 'react'
import { Segment, Form, Message, Button } from 'semantic-ui-react'


class SignupPage extends Component {

  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirm: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  handleSubmit = () => {
    fetch('http://localhost:3000/api/v1/users',{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user: this.state
      })
    }).then(resp => resp.json())
    .then(data => {
      localStorage.setItem("token", data.jwt)
      if (localStorage.token !== "undefined") {
          this.props.history.push("/")
        }
    })
  }


  render(){
    return(
      localStorage.token && localStorage.token !== "undefined" ?
          <Redirect to={"/profile"} /> :
      <>
        <Segment style={{width:"75%", margin:"0 auto"}}>
          <Message>
            <Message.Header>
              Sign Up!
            </Message.Header>
          </Message>
          <Form>
            <Form.Field>
              <label>Username</label>
              <input onChange={this.handleChange} name = "username" placeholder = "Username"/>
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <input onChange={this.handleChange}  name = "email" placeholder = "Email"/>
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input onChange={this.handleChange}  name="password" type="password" placeholder = "Password"/>
            </Form.Field>
            <Form.Field>
              <label>Confirm Password</label>
              <input onChange={this.handleChange}  name="passwordConfirm" type="password" placeholder = "Confirm Password"/>
            </Form.Field>
            <Button onClick={this.handleSubmit} type='submit'>Submit</Button>
          </Form>
        </Segment>
      </>
    )
  }
}
export default SignupPage