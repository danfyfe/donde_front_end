import React, { Component } from 'react'
import { Segment, Header, Form, Button, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'

import ContainerCard from './ContainerCard.js'
import ContainerDisplay from './ContainerDisplay.js'

class Space extends Component {

  state = {
    addingContainer: false,
    newContainerName: "",
    newContainerDescription: "",
    

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

  renderAddContainerHeader = () => {
    return <>
    <Button onClick={() => this.props.setCurrentSpace({})} color="blue" size="mini" floated="right">Back To Household</Button>
    <Button onClick={this.setAddingContainer} color="blue" size="mini" floated="right">Add Container</Button>
    </>
  }

  addContainer = () => {
    fetch('http://localhost:3000/api/v1/containers',{
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
      // console.log('new container', container)
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
    return <ContainerDisplay history={this.props.history} container={this.props.state.currentContainer}/>
  }

  renderNoContainersMessage = () => {
    return <Message warning style={{margin: "3% 0 0 0"}}>This space currently has no containers! Click Add Container to give it one!</Message>
  }



  render(){
    // console.log(this.props.history)
    return(
      <>


      <Segment>
      {this.props.state.currentContainer && this.props.state.currentContainer.hasOwnProperty('id') ? this.renderContainer() :

      <>
      <Header floated="left" as="h2">{this.props.space.name}</Header>
      <Header color="grey" floated="left" as="h2">at {this.props.state.currentHousehold.name}</Header>
      {this.state.addingContainer ? this.renderAddContainerForm() : this.renderAddContainerHeader()}


      {this.renderContainers()}

      </>

      }

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
    setCurrentSpace: (space) => dispatch({type:"SET_CURRENT_SPACE", space}),
    addContainer: (container) => dispatch({type:"ADD_CONTAINER", container})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Space)

