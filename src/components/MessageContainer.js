import React, { Component, } from 'react'
import { Card, Menu, Header } from 'semantic-ui-react'
import MessageCard from './MessageCard.js'

import { connect } from 'react-redux'

class MessageContainer extends Component {

  renderMessageCards = () => {
    if (this.props.state.user.households) {

      let householdMessages = []

      this.props.state.user.households.forEach(household => {
        return householdMessages = [...householdMessages, household.messages].flat()
      })

      return householdMessages.map(message => {
        return <MessageCard key={message.id} message={message}/>
      })
    }
  }


  render(){

    return(
      <>
      <Menu style={{margin:"0px 0px 15px 0px"}}>
        <Header style={{padding:"10px"}}> Messages</Header>
      </Menu>
        <Card.Group>
          {this.renderMessageCards()}
        </Card.Group>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return { state }
}


const mapDispatchToProps = (dispatch) => {
    return {
      setUser: (user) => dispatch({type:"SET_USER", user}),
      setHouseholds: (households) => dispatch({type:"SET_HOUSEHOLDS", households}),
      addHousehold: (household) => dispatch({type:"ADD_HOUSEHOLD", household}),
      setUserHouseholdMessages: (userHouseholdMessages) => dispatch({type:"SET_USERHOUSEHOLDMESSAGES", userHouseholdMessages}),
      addMessage: (message) => dispatch({type:"ADD_MESSAGE", message})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MessageContainer)