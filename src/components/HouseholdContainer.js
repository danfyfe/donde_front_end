import React, { Component } from 'react'
import { Segment, Header, Form, Button, Dropdown, Message, Image } from 'semantic-ui-react'
import SpacesContainer from './SpacesContainer.js'
import { connect } from 'react-redux'

class HouseholdContainer extends Component {

  state = {
    addingSpace: false,
    newSpaceName:"",
    joiningHousehold: false,
    leavingHousehold: false,
    householdPassword: "",

    editingHousehold: false,
    newHouseholdName: "",
    newHouseholdColor:"",
    newHouseholdImage:"",

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
      // this.props.setCurrentSpace(space)
    })
  }

  renderAddSpaceHeader = () => {
    if (!this.state.editingHousehold) {
      return <Button onClick={this.setAddingSpace} color="blue" floated="right" size="mini">Add Space</Button>
    }
  }

  renderAddSpaceForm = () => {
    return <Segment clearing raised style={{marginTop:"3%"}}>
    <Message header={"Add a space to " + this.props.state.currentHousehold.name} size="mini"/>
      <Form>
        <Form.Field>
          <label>Name</label>
          <input onChange={this.handleInput} name="newSpaceName" placeholder="Space Name"/>
        </Form.Field>
        <Button floated="right" size="mini"
         onClick={this.setAddingSpace}>Cancel</Button>
        <Button floated="right" size="mini"
        onClick={this.addSpace}>Submit</Button>
      </Form>
    </Segment>
  }

  renderJoinHouseholdForm = () => {
    return <Segment clearing raised>
      <Form>
        <Form.Field>
          <title>Password</title>
          <input type="password" name="householdPassword" onChange={this.handleInput} placeholder="Please enter Household Password"/>
        </Form.Field>
        <Button floated="right" size="mini"
        onClick={this.setJoiningHousehold}>Cancel</Button>
        <Button floated="right" size="mini" onClick={this.joinHousehold}>Submit</Button>
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
    if (!this.state.addingSpace) {
      return <Button onClick={this.setEditingHousehold} floated="right"color="blue" size="mini">Edit Household</Button>
    }
  }

  handleEditHouseholdColorInput = (e, data) => {

    this.setState({
      // newHouseholdName: e.target.value,
      newHouseholdColor: data.value
    })
  }

  handleEditHouseholdImageInput = (e, data) => {

    this.setState({
      // newHouseholdName: e.target.value,
      newHouseholdImage: data.value
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
          color: this.state.newHouseholdColor,
          image: this.state.newHouseholdImage
        }
      })
    }).then(resp=>resp.json())
    .then(household=>{
      // console.log("updated household", household)
      this.props.setCurrentHousehold(household)
      this.setState({
        editingHousehold: !this.state.editingHousehold
      })
    })
  }

  renderEditHouseholdForm = () => {
    const householdColorDefinitions = ['red','orange','yellow','olive','green','teal','blue','violet','purple','pink','brown','grey']

    const householdImageDefinitions = [{url:"https://i.imgur.com/GMOhUbb.png", name:"House 1"}, {url:"https://i.imgur.com/JSJ5Dk7.png", name: "House 2"}, {url:"https://i.imgur.com/rY6q2iR.png", name:"House 3"}, {url:"https://i.imgur.com/nKUQcrC.png", name:"House 4"}, {url:"https://i.imgur.com/0n5AzLS.png", name:"House 5"}, {url:"https://i.imgur.com/0dtFzLj.png",name:"House 6"}, {url:"https://i.imgur.com/CPYkV9E.png", name:"House 7"}]

    const householdColorOptions = householdColorDefinitions.map(color=>{
      return {key:color,text:color,value:color}
    })

    const householdImageOptions = householdImageDefinitions.map(imageObj => {
      return {key: imageObj.url, text: imageObj.name, value: imageObj.url, image:{ size: "mini", src: imageObj.url }}
    })

    return <Segment clearing raised>
    <Message header={"Edit" + this.props.state.currentHousehold.name} size="mini"/>
      <Form>
        <Form.Field>
        <label>Name</label>
        <input onChange={this.handleEditHouseholdNameInput} placeholder="New Household Name"
        />
        </Form.Field>
        <Form.Field>
        <label>Color</label>
          <Dropdown name="householdColor" onChange={this.handleEditHouseholdColorInput} pointing="top left" placeholder="Select Color" fluid selection options={householdColorOptions}/>
        </Form.Field>
        <Form.Field>
        <label>Image</label>
          <Dropdown name="householdImage" onChange={this.handleEditHouseholdImageInput} pointing="top left" placeholder="Select Image" fluid selection options={householdImageOptions}/>
        </Form.Field>
        <Button floated="right" size="mini" onClick={this.setEditingHousehold}>Cancel</Button>
        <Button onClick={this.editHousehold} floated="right" size="mini">Submit</Button>
      </Form>
    </Segment>
  }

  setLeavingHousehold = () => {
    this.setState({
      leavingHousehold: !this.state.leavingHousehold
    })
  }

  renderLeavingHouseholdHeader = () => {
    return <Button color="red" size="mini" style={{marginTop: "0.5%"}} onClick={this.setLeavingHousehold}>Leave Household</Button>
  }

  renderLeavingHouseholdForm = () => {
    return <Segment clearing raised>
      <Form>
        <Form.Field>
          <title>Password</title>
          <input type="password" name="householdPassword" onChange={this.handleInput} placeholder="Please enter Household Password"/>
        </Form.Field>
        <Button floated="right" size="mini"
        onClick={this.setLeavingHousehold}>Cancel</Button>
        <Button floated="right" size="mini" onClick={this.leaveHousehold} color="red">Leave Household</Button>
      </Form>
    </Segment>
  }

  leaveHousehold = () => {
    fetch(`http://localhost:3000/api/v1/households/${this.props.state.user.id}/${this.props.state.currentHousehold.id}`,{
      method:"DELETE",
      headers:{
        'Content-Type':'application/json',
        Accept: 'application/json'
      },
      body:JSON.stringify({
        leave:{
          user_id: this.props.state.user.id,
          household_id: this.props.state.currentHousehold.id,
          password: this.state.householdPassword
        }
      })
    }).then(resp=>resp.json())
    .then(household=>{
      // this.props.setCurrentHousehold(household)
      this.setState({
        leavingHousehold: !this.state.leavingHousehold
      })
      this.props.history.push('/')
    })

  }

  render(){
    // console.log('HHC state', this.state)
    // console.log(this.props.history)
    // console.log(this.props.state.currentHousehold)
    if (this.props.state.user.households) {
      // console.log(this.props.state.user.households)

    }
    return(
      <>
        <Segment raised clearing style={{minHeight:"500px"}}>

          {this.props.state.currentSpace && this.props.state.currentSpace.hasOwnProperty('id') ? null :
          <>

          <Header onClick={()=>this.props.setCurrentHousehold(this.props.state.currentHousehold)} as="h1" floated="left">{this.props.state.currentHousehold.name}</Header><Image floated="left" src={this.props.state.currentHousehold.image} size="mini"/>

          <Dropdown floated="right" pointing="top right" style={{margin:"0.75% 0 0 77% "}} text="Household">
            <Dropdown.Menu>
              <Dropdown.Item text="Add Space" onClick={this.setAddingSpace}/>
              <Dropdown.Item text="Edit" onClick={this.setEditingHousehold}/>
              <Dropdown.Item text="Leave Household" onClick={this.setLeavingHousehold}/>
            </Dropdown.Menu>
          </Dropdown>

            {this.state.editingHousehold ? this.renderEditHouseholdForm() : null}

            {this.state.addingSpace ? this.renderAddSpaceForm() : null}

            {this.state.leavingHousehold ? this.renderLeavingHouseholdForm() : null}
          </>
        }


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



          // {this.state.editingHousehold ?
          //   this.renderEditHouseholdForm() : this.renderEditHouseholdHeaeder()}
          //
          //
          //   {this.state.addingSpace ? this.renderAddSpaceForm() : this.state.leavingHousehold ? null : this.renderAddSpaceHeader()}
          //
          //   {this.state.leavingHousehold ? this.renderLeavingHouseholdForm() : this.state.addingSpace ? null : this.renderLeavingHouseholdHeader()}