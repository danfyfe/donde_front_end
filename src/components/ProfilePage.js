import React, { Component, } from 'react'
import { Segment, Form, Message, Button, Header, Menu, Card } from 'semantic-ui-react'
import HouseCard from './HouseCard.js'
import MessageContainer from './MessageContainer.js'
class ProfilePage extends Component {
  state = {
    addingHousehold: false,
    householdName: "",
    householdPass: ""
  }

  componentDidMount(){
    fetch('http://localhost:3000/api/v1/profile',{
      method:"POST",
      headers: { Authorization:  localStorage.getItem("token") }
    }).then(resp=>resp.json())
    .then(data=>{
      console.log("Profile!!", data)
    })
  }

// ADD HOUSEHOLD FUNCTIONS
  setAddingHousehold = () => {
    this.setState({
      addingHousehold: !this.state.addingHousehold
    })
  }

  renderHouseholdForm = () => {
    return <>
      <Segment style={{width:"75%", margin:"0 auto"}}>
        <Message header="Create a Household!"/>
        <Form>
          <Form.Field>
            <label>Name</label>
            <input onChange={this.handleHouseholdInput} name="householdName" placeholder='Household Name'/>
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input onChange={this.handleHouseholdInput} name="householdPass" type="password" placeholder='Household Password'/>
          </Form.Field>
          <Button onClick={this.createHousehold}>Submit</Button>
          <Button onClick={this.setAddingHousehold}>Cancel</Button>
        </Form>
      </Segment>
    </>
  }

  handleHouseholdInput = (e) => {
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  createHousehold = () => {
    fetch('http://localhost:3000/api/v1/households',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
        Accept: 'application/json'
      },
      body:JSON.stringify({
        household:{
          name: this.state.householdName,
          password: this.state.householdPass
        }
      })
    }).then(resp=>resp.json())
    .then(household=>{
      console.log(household)
    })
  }
// end of household functions



  render(){
    console.log(this.state)
    if (!localStorage.token || localStorage.token === "undefined") {
    this.props.history.push("/")
    }
    return(
      <>
        <Menu style={{marginTop: "0px"}}>
          <Header style={{padding:"10px"}}>Welcome User!</Header>
        </Menu>


        <Segment style={{width:"98%", margin:"0 auto"}}>
          Hi from profile page

          { this.state.addingHousehold ?
            this.renderHouseholdForm() : <Header href="#"style={{color:"blue"}} onClick={this.setAddingHousehold} as='a'>Add Household</Header>
          }
          <Segment>
            <Menu style={{margin:"0px 0px 15px 0px "}}>
              <Header style={{padding:"10px"}}>Households</Header>
            </Menu>
            <Card.Group>
              <HouseCard/>
              <HouseCard/>
              <HouseCard/>
              <HouseCard/>
            </Card.Group>
          </Segment>
          <Segment>
            <Menu style={{margin:"0px 0px 15px 0px"}}>
              <Header style={{padding:"10px"}}>Messages</Header>
            </Menu>
            <MessageContainer/>
          </Segment>

        </Segment>
      </>
    )
  }





}

export default ProfilePage