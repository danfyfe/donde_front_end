import React, { Component } from 'react'
import { Card, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'

import SpaceCard from './SpaceCard.js'
import Space from './Space.js'


class SpacesConatiner extends Component {
  renderSpaceCards = () => {
    if (this.props.state.currentHousehold.spaces) {
      return this.props.state.currentHousehold.spaces.map(space => {
        return <SpaceCard key={space.id} redirectToSpace={this.redirectToSpace} space={space}/>
      })
    }
  }

  redirectToSpace = (id) => {
    this.props.history.push(`/spaces/${id}`)
  }

  renderSpace = () => {
    return <Space history={this.props.history} space={this.props.state.currentSpace}/>
  }

  render(){
    // console.log('current container in spaces container',this.props.state.currentContainer.hasOwnProperty('id'))
    return(
      <>

      {this.props.state.currentSpace.hasOwnProperty('id') ?  this.renderSpace() :
        <Card.Group itemsPerRow={1}>
        {this.renderSpaceCards()}
        </Card.Group>
      }

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


export default connect(mapStateToProps,mapDispatchToProps)(SpacesConatiner)