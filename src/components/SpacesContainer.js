import React, { Component } from 'react'
import { Segment, Header, Menu, Card } from 'semantic-ui-react'
import SpaceCard from './SpaceCard.js'

class SpacesConatiner extends Component {
  renderSpaceCards = () => {
    if (this.props.household.spaces) {
      return this.props.household.spaces.map(space => {
        return <SpaceCard space={space}/>
      })
    }
  }
  render(){
    // console.log(this.props.household.spaces)
    return(
      
      <Card.Group>
        {this.renderSpaceCards()}
      </Card.Group>
    )
  }
}

export default SpacesConatiner