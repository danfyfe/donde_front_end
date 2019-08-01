import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Button, Segment, Grid, Form, Message, Header } from 'semantic-ui-react'

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
      <>
      <Segment raised style={{maxWidth:'75vw', height:"200px", margin:"2% auto", backgroundColor:"#3d8af7"}}>
        <Segment raised style={{ height:"100%", margin:"auto"}}>
        <Grid>
          <Grid.Row>
            <Header as="h1" style={{margin:"3vh auto 0 auto", textAlign:"center"}}>Welcome to Donde</Header>
          </Grid.Row>
          <Grid.Row>
            <Header as="h4" style={{margin:"auto", textAlign:"center", fontSize:'auto'}}>Where everthing has its place</Header>
          </Grid.Row>
        </Grid>
        </Segment>
      </Segment>

        {this.state.statusMessage ? this.renderErrorMessage():null}
        <Segment placeholder raised style={{margin: "5% auto", width:"50%", minWidth:'50vw'}}>
          <Grid>
            <Grid.Row>
              <Form onSubmit={this.handleLogIn} style={{margin:'2vh auto', width:'75%'}}>
                <Form.Input icon='user' iconPosition='left' label='Username' placeholder='Username'
                  name='username' onChange={this.handleChange} />
                <Form.Input icon='lock' iconPosition='left' label='Password' placeholder="Password" type='password'
                  name='password' onChange={this.handleChange} />
                <Button content='Login' primary size='small'/>
              </Form>
            </Grid.Row>
            <hr style={{margin:'auto'}}width={'75%'}/>
            <Grid.Row>
              <Header as='h4' textAlign='center' style={{margin:'1vh auto'}}>No account?</Header>
            </Grid.Row>
            <Grid.Row>
              <Button content='Sign up' icon='signup' size='small'
              onClick={() => this.props.history.push("/signup")} style={{marginBottom:'1vh'}}/>
            </Grid.Row>
          </Grid>
        </Segment>

      </>
      )
    )
  }


}

export default HomePage

// <Segment placeholder raised style={{margin: "5% auto", width:"50%", minWidth:'75vw'}}>
//   <Grid columns={2} relaxed='very' stackable>
//     <Grid.Column>
//       <Form onSubmit={this.handleLogIn}>
//         <Form.Input icon='user' iconPosition='left' label='Username' placeholder='Username'
//           name='username' onChange={this.handleChange} />
//         <Form.Input icon='lock' iconPosition='left' label='Password' placeholder="Password" type='password'
//           name='password' onChange={this.handleChange} />
//         <Button content='Login' primary />
//       </Form>
//     </Grid.Column>
//
//     <Grid.Column verticalAlign='middle'>
//       <Button content='Sign up' icon='signup' size='big'
//         onClick={() => this.props.history.push("/signup")}/>
//     </Grid.Column>
//   </Grid>
//
//   <Divider vertical>Or</Divider>
// </Segment>