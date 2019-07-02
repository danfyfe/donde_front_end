import React, { Component } from 'react'
import { Segment, Card, List, Icon, Header, Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'

import ContainerCard from './ContainerCard.js'

class Space extends Component {

  renderContainerCards = () => {
    if (this.props.space.containers) {
      return this.props.space.containers.map(container => {
        return <ContainerCard key={container.id} container={container}/>
      })
    }
  }


  render(){
    // console.log(this.props.space)
    return(
      <Segment >
        <Segment>
          <Header size="medium">{this.props.space.name}</Header>
        </Segment>
        <Card.Group itemsPerRow={1}>
          {this.renderContainerCards()}
        </Card.Group>
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

