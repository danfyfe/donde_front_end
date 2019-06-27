import React, { Component, } from 'react'
import { Segment, Form, Message, Button, Header, Menu } from 'semantic-ui-react'
import HouseholdCardsContainer from './HouseholdCardsContainer.js'
import MessageContainer from './MessageContainer.js'
// import withAuth from '../hocs/withAuth'

class ProfilePage extends Component {
  state = {
    userData: {},
    households:[],
    addingHousehold: false,
    householdName: "",
    householdPass: ""
  }

  componentDidMount(){
    fetch('http://localhost:3000/api/v1/profile',{
      method:"POST",
      headers: { Authorization:  localStorage.getItem("token") }
    }).then(resp=>resp.json())
    .then(user=>{
      // console.log("Profile!!", data)
      this.setState({
        userData: user
      })
    })


    fetch('http://localhost:3000/api/v1/households')
    .then(resp=>resp.json())
    .then(households=>{
      // console.log(households)
      this.setState({
        households: households
      })
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
      const newHouseholds = [...this.state.households, household]
      this.setState({
        households: newHouseholds
      })
    })
  }
// end of household functions



  render(){
    // console.log(store)
    // console.log("PROF STATE",this.state)
    // console.log("PROF PROPS",this.props)
    if (!localStorage.token || localStorage.token === "undefined") {
    this.props.history.push("/")
    }
    return(
      <>
        <Menu style={{marginTop: "0px"}}>
          <Header style={{padding:"10px"}}>Welcome User!</Header>
        </Menu>


        <Segment style={{width:"98%", margin:"0 auto"}}>

          <Segment>
            <Menu style={{margin:"0px 0px 15px 0px "}}>
              <Header style={{padding:"10px"}}>Households</Header>
            </Menu>
            <Segment clearing>
              { this.state.addingHousehold ?
                this.renderHouseholdForm() : <Header floated="right"href="#"style={{color:"blue"}} onClick={this.setAddingHousehold} as='a'>Add Household</Header>
              }
            </Segment>

          <HouseholdCardsContainer history={this.props.history} households={this.state.households}/>

          </Segment>
          <Segment>
            

            <MessageContainer/>

          </Segment>

        </Segment>
      </>
    )
  }

// mapStateToProps = () => {
//
// }
//
// mapDispatchToProps = (dispatch) =>{
//   return {dispatch}
// }



}

export default ProfilePage