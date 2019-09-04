import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Button, Segment, Form, Message, Header } from 'semantic-ui-react'

let API_ENDPOINT
if (process.env.NODE_ENV === 'production') {
  API_ENDPOINT = 'https://df-donde-api.herokuapp.com'
} else {
  API_ENDPOINT = 'http://localhost:3000'
}



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
    fetch(`${API_ENDPOINT}/api/v1/login`,{
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
      <div className='d-flex flex-column'>

        <Segment raised style={{maxWidth:'75vw', margin:"5vh auto", backgroundColor:"#3d8af7"}}>
          <Segment raised className='d-flex flex-column'style={{ height:"100%", margin:"auto"}}>

              <h3 className='m-auto text-center'>Welcome to Donde</h3>

              <span className='m-auto small-font text-center'>Where everthing has its place</span>

          </Segment>
        </Segment>

        {this.state.statusMessage ? this.renderErrorMessage():null}

        <Segment placeholder raised className='' style={{margin:'5vh auto'}}>
              <Form onSubmit={this.handleLogIn} style={{margin:'2vh auto'}}>
                <Form.Input icon='user' iconPosition='left' label='Username' placeholder='Username'
                  name='username' onChange={this.handleChange} />
                <Form.Input icon='lock' iconPosition='left' label='Password' placeholder="Password" type='password'
                  name='password' onChange={this.handleChange} />
                <Button content='Login' primary size='small'/>
              </Form>

            <hr style={{margin:'auto'}}width={'75%'}/>

              <Header as='h4' textAlign='center' style={{margin:'1vh auto'}}>No account?</Header>

              <Button content='Sign up' icon='signup' size='small'
              onClick={() => this.props.history.push("/signup")} style={{marginBottom:'1vh'}}/>
        </Segment>

      </div>
      )
    )
  }


}

export default HomePage
