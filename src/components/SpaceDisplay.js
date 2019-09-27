import React, { Component } from 'react'
import { Segment, Form, Button, Message, Dropdown } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import ContainerCard from './ContainerCard.js'
import ContainerDisplay from './ContainerDisplay.js'

import EditSpaceForm from './forms/spaces/EditSpaceForm.js'
import DeleteSpaceForm from './forms/spaces/DeleteSpaceForm.js'

let API_ENDPOINT
if (process.env.NODE_ENV === 'production') {
  API_ENDPOINT = 'https://df-donde-api.herokuapp.com'
} else {
  API_ENDPOINT = 'http://localhost:3000'
}

class Space extends Component {

  state = {
    addingContainer: false,
    editingSpace: false,
    deletingSpace: false,
    newContainerName: "",
    newContainerDescription: "",
    newSpaceName: "",
    householdPassword: "",
    statusMessage: ""
  }

  renderContainerCards = () => {

    if (this.props.space.containers) {
      if (this.props.space.containers.length === 0) {
        return this.renderNoContainersMessage()
      } else {
        return this.props.space.containers.map(container => {
          return <ContainerCard key={container.id} container={container}/>
        })
      }
    }
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  setAddingContainer = () => {
    this.setState({
      addingContainer: !this.state.addingContainer
    })
  }

  setEditingSpace = () => {
    this.setState({
      editingSpace: !this.state.editingSpace
    })
  }

  setDeletingSpace = () => {
    this.setState({
      deletingSpace: !this.state.deletingSpace
    })
  }

  addContainer = () => {
    fetch(`${API_ENDPOINT}/api/v1/containers`,{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
        Accept: 'application/json'
      },
      body:JSON.stringify({
        container:{
          name: this.state.newContainerName,
          description: this.state.newContainerDescription,
          space_id: this.props.state.currentSpace.id
        }
      })
    }).then(resp=>resp.json())
    .then(container =>{

      this.props.addContainer(container)

      this.setState({
        addingContainer: !this.state.addingContainer
      })
    })
  }

  renderAddContainerForm = () => {
    return <Segment clearing raised style={{marginTop:"2%"}}>
      <Message header={"Add a Container to " + this.props.state.currentSpace.name} size="mini"/>
      <Form>
        <Form.Field>
          <label>Name</label>
          <input onChange={this.handleInput} name="newContainerName" placeholder="Container Name"/>
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <input onChange={this.handleInput} name="newContainerDescription" placeholder="Continer Description"/>
        </Form.Field>
        <Button onClick={this.setAddingContainer} floated="right" size="mini">Cancel</Button>
        <Button onClick={this.addContainer} floated="right" size="mini">Submit</Button>
      </Form>
    </Segment>
  }

  renderContainers = () => {
    return <>
      {this.renderContainerCards()}
    </>
  }

  renderContainer = () => {
    return <ContainerDisplay history={this.props.history} container={this.props.container}/>
  }

  renderNoContainersMessage = () => {
    return <Message warning style={{margin: "3% 0 0 0"}}>This space currently has no containers! Click Add Container in the dropdown to give it one!</Message>
  }

  // renderEditSpaceForm = () => {
  //   return <Segment clearing>
  //   <Message header={"Edit " + this.props.state.currentSpace.name} size="mini"/>
  //   <Form>
  //     <Form.Field>
  //       <label>New Name</label>
  //       <input onChange={this.handleInput} name="newSpaceName" placeholder={this.props.state.currentSpace.name}/>
  //     </Form.Field>
  //     <Button onClick={this.setEditingSpace} floated="right" size="mini">Cancel</Button>
  //     <Button onClick={this.editSpace} floated="right" size="mini">Submit</Button>
  //   </Form>
  //   </Segment>
  // }

  // renderDeleteSpaceForm = () => {
  //   return <Segment clearing>
  //   <Message header={"Delete " + this.props.state.currentSpace.name} size="mini"/>
  //   <Form>
  //     <Form.Field>
  //       <label>Household Password</label>
  //       <input onChange={this.handleInput} name="householdPassword" type="password" placeholder="Household Password"/>
  //     </Form.Field>
  //     <Button onClick={this.setDeletingSpace} floated="right" size="mini">Cancel</Button>
  //     <Button onClick={this.deleteSpace} floated="right" size="mini" color="red">Delete Space</Button>
  //   </Form>
  //   </Segment>
  // }

  // editSpace = () => {
  //   fetch(`${API_ENDPOINT}/api/v1/spaces/${this.props.state.currentSpace.id}`,{
  //     method:"PATCH",
  //     headers:{
  //       'Content-Type':'application/json',
  //       Accept: 'application/json'
  //     },
  //     body:JSON.stringify({
  //       space:{
  //         id: this.props.state.currentSpace.id,
  //         name: this.state.newSpaceName,
  //         household_id: this.props.state.currentHousehold.id
  //       }
  //     })
  //   }).then(resp=>resp.json())
  //   .then(updatedSpace =>{
  //     // console.log('updated space', updatedSpace)
  //     this.props.updateSpace(updatedSpace)
  //     this.props.setCurrentSpace(updatedSpace)
  //
  //     this.setState({
  //       editingSpace: !this.state.editingSpace
  //     })
  //   })
  // }

  // deleteSpace = () => {
  //   fetch(`${API_ENDPOINT}/api/v1/spaces/${this.props.state.currentSpace.id}`,{
  //     method:"DELETE",
  //     headers:{
  //       'Content-Type':'application/json',
  //       Accept: 'application/json'
  //     },
  //     body:JSON.stringify({
  //       space:{
  //         id: this.props.state.currentSpace.id,
  //       },
  //       household_id: this.props.state.currentHousehold.id,
  //       household_password: this.state.householdPassword
  //     })
  //   }).then(resp=>resp.json())
  //   .then(household =>{
  //     this.setState({
  //       deletingSpace: !this.state.deletingSpace,
  //     })
  //     this.props.setCurrentHousehold(household)
  //     this.props.setCurrentSpace({})
  //   })
  // }

  renderStatusMessage = () => {
    return <Message warning>{this.state.statusMessage}</Message>
  }

  render(){
    const { space, container, household } = this.props

    return(
      <>
      <div style={{minHeight:'500px'}}>
      {this.state.statusMessage !== "" ? this.renderStatusMessage(): null}

      {container && container.hasOwnProperty('id') ? this.renderContainer() :

      <>
      <div className='d-flex justify-content-between'>
        <div className='d-flex flex-column'>
          <span className='font-weight-bold text-nowrap'>{space.name}</span>
          <span className='text-muted text-nowrap small-font' style={{paddingLeft:'5%'}}>at {household.name}</span>
        </div>

        <div className='d-flex'>
          <Dropdown floated="right" pointing="top right" style={{}} text="Space">
            <Dropdown.Menu>
              <Dropdown.Item text="Add Container" onClick={this.setAddingContainer}/>
              <Dropdown.Item text="Edit Space" onClick={this.setEditingSpace}/>
              <Dropdown.Item text="Delete Space" onClick={this.setDeletingSpace}/>
              <Dropdown.Item text="Back To Household" onClick={() => this.props.setCurrentSpace({})}/>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>


      {this.state.addingContainer ? this.renderAddContainerForm() :null}
      {this.state.editingSpace ? <EditSpaceForm
        setEditingSpace={this.setEditingSpace}/> : null}

      {this.state.deletingSpace ? <DeleteSpaceForm setDeletingSpace={this.setDeletingSpace} /> : null}

      {this.renderContainers()}

      </>

      }

        </div>

      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    household: state.household,
    space: state.space,
    container: state.container
   }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    // setUser: (user) => dispatch({type:"SET_USER", user}),
    // setCurrentHousehold: (household) => dispatch({type:"SET_CURRENT_HOUSEHOLD", household}),
    // addSpace: (space) => dispatch({type:"ADD_SPACE", space}),
    setCurrentSpace: (space) => dispatch({type:"SET_CURRENT_SPACE", space}),
    addContainer: (container) => dispatch({type:"ADD_CONTAINER", container}),
    // updateSpace: (space) => dispatch({type:"UPDATE_SPACE", space})
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Space))

