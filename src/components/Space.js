import React, { Component } from 'react'
import { Segment, Card, List, Icon, Header, Menu, Form, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'

import ContainerCard from './ContainerCard.js'
import Container from './Container.js'

class Space extends Component {

  state = {
    addingContainer: false,
    containerName: "",
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

  renderAddContainerForm = () => {
    return <Segment>
      <Form>
        <Form.Field>
          <label>Container Name</label>
          <input onChange={this.handleInput}/>
        </Form.Field>
      </Form>
    </Segment>
  }

  renderContainers = () => {
    return <Card.Group itemsPerRow={1}>
      {this.renderContainerCards()}
    </Card.Group>
  }

  renderContainer = () => {
    return <Container container={this.props.state.currentContainer}/>
  }

  render(){
    // console.log(this.props.space)
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
    setCurrentSpace: (space) => dispatch({type:"SET_CURRENT_SPACE", space})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Space)

