import React from 'react'
import { Component, Redirect } from 'react'
import { Segment, Form, Message, Button } from 'semantic-ui-react'


class SignupPage extends Component {

  state = {
    username: "",
    email:"",
    phone_number: "",
    password: "",
    passwordConfirm: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = () => {
    fetch('https://df-donde-api.herokuapp.com/api/v1/users',{
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
        <Segment clearing style={{width:"75%", margin:"10% auto"}}>
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
            {/*<Form.Field>
              <label>Phone</label>
              <input onChange={this.handleChange}  name = "phone_number" placeholder = "Phone"/>
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <input onChange={this.handleChange}  name = "email" placeholder = "Email"/>
            </Form.Field>*/}
            <Form.Field>
              <label>Password</label>
              <input onChange={this.handleChange}  name="password" type="password" placeholder = "Password"/>
            </Form.Field>
            <Form.Field>
              <label>Confirm Password</label>
              <input onChange={this.handleChange}  name="passwordConfirm" type="password" placeholder = "Confirm Password"/>
            </Form.Field>
            <Button floated='right' onClick={this.handleSubmit} type='submit' size='small'>Submit</Button>
          </Form>
        </Segment>
      </>
    )
  }
}
export default SignupPage