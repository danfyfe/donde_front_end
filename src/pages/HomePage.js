import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Button, Segment, Grid, Form, Divider, Message, Header } from 'semantic-ui-react'

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
    fetch('https://df-donde-api.herokuapp.com/api/v1/login',{
      method:"POST",
      headers: {"Content-Type": "application/json", Authorization:  localStorage.getItem("token")},
      body: JSON.stringify({user:this.state})
    }).then(resp=>resp.json())
    .then(data=>{
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

  return ( localStorage.token && localStorage.token !== "undefined" ? (
      <Redirect to={"/profile"} />
    ) : (
      <>
      <Segment raised style={{width:"30%", height:"200px", margin:"2% auto", backgroundColor:"#3d8af7"}}>
        <Segment raised style={{ height:"100%", margin:"auto"}}>
          <Header as="h1" style={{margin:"6% auto", textAlign:"center"}}>Welcome to Donde</Header>
          <Header as="h4" style={{margin:"auto", textAlign:"center"}}>Where everthing has its place</Header>
        </Segment>
      </Segment>

        {this.state.statusMessage ? this.renderErrorMessage():null}
        <Segment placeholder raised style={{margin: "5% auto", width:"50%"}}>
          <Grid columns={2} relaxed='very' stackable>
            <Grid.Column>
              <Form onSubmit={this.handleLogIn}>
                <Form.Input icon='user' iconPosition='left' label='Username' placeholder='Username'
                  name='username' onChange={this.handleChange} />
                <Form.Input icon='lock' iconPosition='left' label='Password' placeholder="Password" type='password'
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