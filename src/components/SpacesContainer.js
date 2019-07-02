import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'
import SpaceCard from './SpaceCard.js'

import { connect } from 'react-redux'

class SpacesConatiner extends Component {
  renderSpaceCards = () => {
    if (this.props.state.currentHousehold.spaces) {
      return this.props.state.currentHousehold.spaces.map(space => {
        return <SpaceCard key={space.id} redirectToSpace={this.redirectToSpace}space={space}/>
      })
    }
  }

  redirectToSpace = (id) => {
    this.props.history.push(`/spaces/${id}`)
  }

  render(){
    // console.log(this.props.household.messages)
    return(

      <Card.Group itemsPerRow={6}>
        {this.renderSpaceCards()}
      </Card.Group>
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
    addSpace: (space) => dispatch({type:"ADD_SPACE", space})
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(SpacesConatiner)