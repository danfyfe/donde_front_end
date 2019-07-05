import React, { Component } from 'react'
import { Segment, Header, Form, Button, Dropdown } from 'semantic-ui-react'
import SpacesContainer from './SpacesContainer.js'
import { connect } from 'react-redux'

class HouseholdContainer extends Component {

  state = {
    addingSpace: false,
    newSpaceName:"",
    joiningHousehold: false,
    householdPassword: "",

    editingHousehold: false,
    newHouseholdName: "",
    newHouseholdColor:"",

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
    return <Button onClick={this.setAddingSpace} color="blue" floated="right" size="mini">Add Space</Button>
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
    return <Button onClick={this.setJoiningHousehold} color="blue" floated="right" size="mini">Join Household</Button>
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
  //  end add space/join household


  // edit household

  setEditingHousehold = () => {
    this.setState({
      editingHousehold: !this.state.editingHousehold
    })
  }

  renderEditHouseholdHeaeder = () => {
    return <Button onClick={this.setEditingHousehold} floated="right"color="blue" size="mini">Edit Household</Button>
  }

  handleEditHouseholdColorInput = (e) => {
    // console.log('target innertext',e.target.innerText)
    this.setState({
      // newHouseholdName: e.target.value,
      newHouseholdColor: e.target.innerText
    })
  }
  handleEditHouseholdNameInput = (e) => {
    // console.log('target innertext',e.target.innerText)
    this.setState({
      newHouseholdName: e.target.value
      // newHouseholdColor: e.target.innerText
    })
  }

  editHousehold = () => {
    fetch(`http://localhost:3000/api/v1/households/${this.props.state.currentHousehold.id}`,{
      method:"PATCH",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization:  localStorage.getItem("token")
      },
      body:JSON.stringify({
        household:{
          id: this.props.state.currentHousehold.id,
          name: this.state.newHouseholdName,
          color: this.state.newHouseholdColor
        }
      })
    }).then(resp=>resp.json())
    .then(household=>{
      // console.log("updated household", household)
      this.props.setCurrentHousehold(household)
    })
  }

  renderEditHouseholdForm = () => {
    const householdColorDefinitions = ['red','orange','yellow','olive','green','teal','blue','violet','purple','pink','brown','grey']

    const householdColorOptions = householdColorDefinitions.map(color=>{
      return {key:color,text:color,value:color}
    })

    return <Segment clearing>
      <Form>
        <Form.Field>
        <label>Name</label>
        <input onChange={this.handleEditHouseholdNameInput} placeholder="New Household Name"/>
        </Form.Field>
        <Form.Field>
        <label>Color</label>
          <Dropdown name="householdColor" onChange={this.handleEditHouseholdColorInput} pointing="top left" placeholder="Select Color" fluid selection options={householdColorOptions}/>
        </Form.Field>
        <Button floated="right" onClick={this.setEditingHousehold}>Cancel</Button>
        <Button onClick={this.editHousehold} floated="right">Submit</Button>
      </Form>
    </Segment>
  }


  render(){
    // console.log('HHC state', this.state)
    if (this.props.state.user.households) {
      // console.log(this.props.state.user.households)

    }
    return(
      <>
        <Segment raised>
          <Header onClick={()=>this.props.setCurrentHousehold(this.props.state.currentHousehold)} as="h1" floated="left">{this.props.state.currentHousehold.name}</Header>
          {this.state.editingHousehold ?
          this.renderEditHouseholdForm() : this.renderEditHouseholdHeaeder()}
          {this.setAddOrJoin()}

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