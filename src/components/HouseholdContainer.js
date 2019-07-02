import React, { Component } from 'react'
import { Segment, Header, Form, Button } from 'semantic-ui-react'
import SpacesContainer from './SpacesContainer.js'
import { connect } from 'react-redux'

class HouseholdContainer extends Component {

  state = {
    addingSpace: false,
    newSpaceName:"",
    joiningHousehold: false,
    householdPassword: "",

    currentSpace: {},
    currentContainer: {}
  }

  setAddingSpace = () => {
    this.setState({
      addingSpace: !this.state.addingSpace
    })
  }

  setJoiningHousehold = () => {
    this.setState({
      joiningHousehold: !this.state.joiningHousehold
    })
  }

  handleInput = (e) => {
      this.setState({
        [e.target.name]:e.target.value
      })
  }

  joinHousehold = () => {
    fetch(`http://localhost:3000/api/v1/households/${this.props.state.user.id}/${this.props.state.currentHousehold.id}`,{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
        Accept: 'application/json'
      },
      body:JSON.stringify({
        join:{
          user_id: this.props.state.user.id,
          household_id: this.props.state.currentHousehold.id,
          password: this.state.householdPassword
        }
      })
    }).then(resp=>resp.json())
    .then(household=>{
      // this.props.setCurrentHousehold(household)
      this.setState({
        joiningHousehold: !this.state.joiningHousehold
      })
    })
  }

  addSpace = () => {
    fetch('http://localhost:3000/api/v1/spaces',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
        Accept: 'application/json'
      },
      body:JSON.stringify({
        space:{
          name: this.state.newSpaceName,
          household_id: this.props.state.currentHousehold.id
        }
      })
    }).then(resp=>resp.json())
    .then(space=>{
      this.setState({
        addingSpace: !this.state.addingSpace
      })
      this.props.addSpace(space)
    })
  }

  renderAddSpaceHeader = () => {
    return <Header onClick={this.setAddingSpace} color="blue" as='a'>Add Space</Header>
  }

  renderAddSpaceForm = () => {
    return <Segment clearing>
      <Form>
        <Form.Field>
          <label>Name</label>
          <input onChange={this.handleInput} name="newSpaceName" placeholder="Space Name"/>
        </Form.Field>
        <Button floated="right"
         onClick={this.setAddingSpace}>Cancel</Button>
        <Button floated="right"
        onClick={this.addSpace}>Submit</Button>
      </Form>
    </Segment>
  }

  renderJoinHouseholdForm = () => {
    return <Segment clearing>
      <Form>
        <Form.Field>
          <title>Password</title>
          <input type="password" name="householdPassword" onChange={this.handleInput} placeholder="Please enter Household Password"/>
        </Form.Field>
        <Button floated="right"
        onClick={this.setJoiningHousehold}>Cancel</Button>
        <Button floated="right" onClick={this.joinHousehold}>Submit</Button>
      </Form>
    </Segment>
  }

  renderJoinHouseholdHeader = () => {
    return <Header onClick={this.setJoiningHousehold} style={{color:"blue"}} as='a'>Join Household</Header>
  }

  setAddOrJoin = () => {
    if (this.props.state.user.households) {
      // console.log(this.props.state.user.households)
      // console.log(this.props.state.user.households.includes(this.props.state.currentHousehold))
      let memberOfHousehold = this.props.state.user.households.find(household => {
        return household.id === this.props.state.currentHousehold.id
      })
      if (memberOfHousehold) {
        // console.log('you are a member of this household')
        if (this.state.addingSpace) {
          return this.renderAddSpaceForm()
        }else {
          return this.renderAddSpaceHeader()
        }
      }else {
        // console.log('you are NOT a memeber of this household')
        if (this.state.joiningHousehold) {
          return this.renderJoinHouseholdForm()
        }else {
          return this.renderJoinHouseholdHeader()
        }
      }
    }
  }

  render(){
    return(
      <>
        <Segment raised >
          <Header as="h1">{this.props.state.currentHousehold.name}</Header>
          {this.setAddOrJoin()}
          {}
          <SpacesContainer history={this.props.history}/>

        </Segment>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return { state }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    setUser: (user) => dispatch({type:"SET_USER", user}),
    setCurrentHousehold: (household) => dispatch({type:"SET_CURRENT_HOUSEHOLD", household}),
    addSpace: (space) => dispatch({type:"ADD_SPACE", space}),
    setCurrentSpace: (space) => dispatch({type:"SET_CURRENT_SPACE"})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(HouseholdContainer)