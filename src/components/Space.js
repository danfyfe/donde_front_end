import React, { Component } from 'react'
import { Segment, Card, List, Icon, Header, Menu, Form, Button, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'

import ContainerCard from './ContainerCard.js'
import Container from './Container.js'

class Space extends Component {

  state = {
    addingContainer: false,
    newContainerName: "",
    newContainerDescription: ""
  }

  renderContainerCards = () => {
    if (this.props.space.containers) {
      return this.props.space.containers.map(container => {
        return <ContainerCard key={container.id} container={container}/>
      })
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
    return <Header onClick={this.setAddingContainer} color="blue">Add Container</Header>
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
    return <Segment clearing>
      <Message>Add a Container to the Space!</Message>
      <Form>
        <Form.Field>
          <label>Name</label>
          <input onChange={this.handleInput} name="newContainerName" placeholder="Container Name"/>
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <input onChange={this.handleInput} name="newContainerDescription" placeholder="Continer Description"/>
        </Form.Field>
        <Button onClick={this.setAddingContainer} floated="right">Cancel</Button>
        <Button onClick={this.addContainer} floated="right">Submit</Button>
      </Form>
    </Segment>
  }

  renderContainers = () => {
    return <Card.Group itemsPerRow={1}>
      {this.renderContainerCards()}
    </Card.Group>
  }

  renderContainer = () => {
    return <Container history={this.props.history} container={this.props.state.currentContainer}/>
  }



  render(){
    // console.log(this.props.history)
    return(
      <Segment >
        <Segment>
          <Header size="medium">{this.props.space.name}</Header>
          {this.state.addingContainer ? this.renderAddContainerForm() : this.renderAddContainerHeader()}


        </Segment>
          {this.props.state.currentContainer.hasOwnProperty('id') ?
          this.renderContainer() : this.renderContainers()}

      </Segment>
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

