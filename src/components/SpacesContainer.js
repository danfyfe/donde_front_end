import React, { Component } from 'react'
import { Message, Header, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'

import SpaceCard from './SpaceCard.js'
import Space from './Space.js'


class SpacesConatiner extends Component {
  renderSpaceCards = () => {
    if (this.props.state.currentHousehold.spaces) {
      if (this.props.state.currentHousehold.spaces.length === 0) {
        return <Message warning style={{margin:"4% 0 0 0", textAlign:"center"}}>There are currently no spaces in this household. A space is a location that you put your stuff, like a closet or storage area. Click Add Space to add one!</Message>
      } else {
        return this.props.state.currentHousehold.spaces.map(space => {
          return <SpaceCard key={space.id} redirectToSpace={this.redirectToSpace} space={space}/>
        })
      }
    }
  }

  // redirectToSpace = (id) => {
  //   this.props.history.push(`/spaces/${id}`)
  // }

  renderSpace = () => {
    return <Space history={this.props.history} space={this.props.state.currentSpace}/>
  }

  render(){
    // console.log('current container in spaces container',this.props.state.currentContainer.hasOwnProperty('id'))
    return(
      <>
      {this.props.state.currentSpace && this.props.state.currentSpace.hasOwnProperty('id') ?  <> {this.renderSpace()} </>:
        <>
          <Segment style={{margin:"4% auto", minHeight:"500px"}}>
            <Header>Spaces:</Header>
            {this.renderSpaceCards()}
          </Segment>
        </>
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