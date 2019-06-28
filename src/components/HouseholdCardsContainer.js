import React, { Component } from 'react'
import { Card, Segment, Menu, Form, Message,Button, Header,Dropdown } from 'semantic-ui-react'

import HouseholdCard from './HouseholdCard.js'

class HouseholdCardsContainer extends Component {
  state = {
    households:[],
    addingHousehold: false,
    householdName: "",
    householdPass: "",
    householdColor: ""
  }

  componentDidMount(){
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
      const householdColorDefinitions = ['red','orange','yellow','olive','green','teal','blue','violet','purple','pink','brown','grey']

      const householdColorOptions = householdColorDefinitions.map(color=>{
        return {key:color,text:color,value:color}
      })

      return <>
        <Segment style={{width:"75%", margin:"0 auto"}}>
          <Message header="Add a Household!"/>
          <Form>
            <Form.Field>
              <label>Name</label>
              <input onChange={this.handleHouseholdInput} name="householdName" placeholder='Household Name'/>
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input onChange={this.handleHouseholdInput} name="householdPass" type="password" placeholder='Household Password'/>
            </Form.Field>
            <Form.Field>
            <label>Color</label>
              <Dropdown name="householdColor" onChange={this.handleHouseholdInput} pointing="top left" placeholder="Select Color" fluid selection options={householdColorOptions}/>
            </Form.Field>
            <Button onClick={this.createHousehold}>Submit</Button>
            <Button onClick={this.setAddingHousehold}>Cancel</Button>
          </Form>
        </Segment>
      </>
    }

    handleHouseholdInput = (e) => {
      // console.log("TARGET",e.target.innerText)
      // FIX THIS!!! find value for dropdown
      this.setState({
        [e.target.name]:e.target.value,
        householdColor: e.target.innerText
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
            password: this.state.householdPass,
            color: this.state.householdColor
          },
          user: this.props.user
        })
      }).then(resp=>resp.json())
      .then(household=>{
        // console.log(household)
        const newHouseholds = [...this.state.households, household]
        this.setState({
          households: newHouseholds
        })
      })
    }
  // end of household functions


  renderHouseholdCards = () => {
    return this.state.households.map(household=>{
      // console.log(household)
      return <HouseholdCard key={household.id} redirectToHousehold={this.redirectToHousehold} household={household}/>
    })
  }

  redirectToHousehold = (id) => {
    // console.log(id)
    this.props.history.push(`/households/${id}`)
  }

  render(){
    // console.log("HHCARDCONT",this.props)
    return(


      <>
          <Menu style={{margin:"0px 0px 15px 0px "}}>
            <Header style={{padding:"10px"}}>Households</Header>
          </Menu>
          <Segment clearing>
            { this.state.addingHousehold ?
              this.renderHouseholdForm() : <Header floated="right"href="#"style={{color:"blue"}} onClick={this.setAddingHousehold} as='a'>Add Household</Header>
            }
          </Segment>


          <Card.Group>
            {this.renderHouseholdCards()}
          </Card.Group>
      </>
    )
  }
}

export default HouseholdCardsContainer