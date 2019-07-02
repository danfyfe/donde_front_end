import React, { Component } from 'react'
import { Card, Segment, Menu, Form, Message,Button, Header,Dropdown } from 'semantic-ui-react'
import HouseholdCard from './HouseholdCard.js'
import { connect } from 'react-redux'

class HouseholdCardsContainer extends Component {
  state = {
    addingHousehold: false,
    householdName: "",
    householdPass: "",
    householdColor: ""
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
      <Segment clearing style={{width:"75%", margin:"20px auto"}}>
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
        user: this.props.state.user
      })
    }).then(resp=>resp.json())
    .then(household=>{
      this.props.addHousehold(household)
      this.setState({
        addingHousehold: !this.state.addingHousehold
      })
    })
  }
// end of household functions


  renderHouseholdCards = () => {
      // console.log("PROPS STATE HH IN RHHC", this.props.state.user.households)
    if (this.props.state.user.households) {
      return this.props.state.user.households.map(household=>{
        return <HouseholdCard key={household.id} household={household}
        redirectToHousehold={this.redirectToHousehold}/>
      })
    }
  }

  redirectToHousehold = (id) => {
    this.props.history.push(`/households/${id}`)
  }

  render(){

    return(
      <>
          <Menu style={{margin:"0px 0px 15px 0px "}}>
            <Header style={{padding:"10px"}}>Households</Header>
          </Menu>

            { this.state.addingHousehold ?
              this.renderHouseholdForm() : <Header floated="right"href="#"style={{color:"blue"}} onClick={this.setAddingHousehold} as='a'>Add Household</Header>
            }

          <Card.Group>
            {this.renderHouseholdCards()}
          </Card.Group>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return { state }
}


const mapDispatchToProps = (dispatch) => {
    return {
      setUser: (user) => dispatch({type:"SET_USER", user}),
      setHouseholds: (households) => dispatch({type:"SET_HOUSEHOLDS",households}),
      addHousehold: (household) => dispatch({type:"ADD_HOUSEHOLD", household})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(HouseholdCardsContainer)