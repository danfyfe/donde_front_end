import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Button, Segment, Grid, Form, Divider, Message } from 'semantic-ui-react'

class HomePage extends Component {
  state = {
    username:"",
    password: "",
    statusMessage: null
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLogIn = () => {
    fetch('http://localhost:3000/api/v1/login',{
      method:"POST",
      headers: {"Content-Type": "application/json", Authorization:  localStorage.getItem("token")},
      body: JSON.stringify({user:this.state})
    }).then(resp=>resp.json())
    .then(data=>{
      // console.log(data)

      if (data.message) {
        this.setState({
          statusMessage: data.message
        })
      } else {
        this.setState({
          statusMessage: null
        })
      }

      localStorage.setItem("token", data.jwt)
      if (localStorage.token !== "undefined") {
        this.props.history.push("/")
      }

    })
  }

  renderErrorMessage = () => {
    return <Message warning  style={{margin: "5% 5% 0 5%"}}>{this.state.statusMessage}</Message>
  }

render(){
  // console.log(this.state.statusMessage)
  return ( localStorage.token && localStorage.token !== "undefined" ? (
      <Redirect to={"/profile"} />
    ) : (
      <>
        {this.state.statusMessage ? this.renderErrorMessage():null}
        <Segment placeholder style={{margin: "100px 100px"}}>
          <Grid columns={2} relaxed='very' stackable>
            <Grid.Column>
              <Form onSubmit={this.handleLogIn}>
                <Form.Input icon='user' iconPosition='left' label='Username' placeholder='Username'
                  name='username' onChange={this.handleChange} />
                <Form.Input icon='lock' iconPosition='left' label='Password' type='password'
                  name='password' onChange={this.handleChange} />
                <Button content='Login' primary />
              </Form>
            </Grid.Column>

            <Grid.Column verticalAlign='middle'>
              <Button content='Sign up' icon='signup' size='big'
                onClick={() => this.props.history.push("/signup")}/>
            </Grid.Column>
          </Grid>

          <Divider vertical>Or</Divider>
        </Segment>
      </>
      )
    )
}




}

export default HomePage