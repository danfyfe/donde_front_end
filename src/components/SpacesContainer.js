import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'
import SpaceCard from './SpaceCard.js'

class SpacesConatiner extends Component {
  renderSpaceCards = () => {
    if (this.props.household.spaces) {
      return this.props.household.spaces.map(space => {
        return <SpaceCard redirectToSpace={this.redirectToSpace}space={space}/>
      })
    }
  }

  redirectToSpace = (id) => {
    this.props.history.push(`/spaces/${id}`)
  }




  render(){
    // console.log(this.props.household.messages)
    return(

      <Card.Group itemsPerRow={4}>
        {this.renderSpaceCards()}
      </Card.Group>
    )
  }
}

export default SpacesConatiner