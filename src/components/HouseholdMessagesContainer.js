import React, { Component } from 'react'
import { Header, Menu, Card } from 'semantic-ui-react'
import HouseholdMessageCard from './HouseholdMessageCard.js'
import { connect } from 'react-redux'

class HouseholdMessagesContainer extends Component {
  // state = {
  //   messages:[]
  // }
  //
  //
  // renderMessageCards = () => {
  //   if (this.props.state.currentHousehold.messages) {
  //     return this.props.state.currentHousehold.messages.map(message => {
  //         return <HouseholdMessageCard message={message} household={this.props.state.currentHousehold}/>
  //       })
  //   }
  //
  // }

  renderMessageCards = () => {
    if (this.props.state.user.households && this.props.state.currentHousehold) {
      //
      // let householdMessages = []
      //
      // this.props.state.user.households.forEach(household => {
      //   return householdMessages = [...householdMessages, household.messages].flat()
      // })
      //
      return this.props.state.currentHousehold.messages.map(message => {
        return <HouseholdMessageCard key={message.id} message={message}/>
      })
    }
  }



  render(){
    // this.setHouseholdMessages()
    // console.log("HHMC", this.props.state.currentHousehold.messages)
    return(
      <>
      <Menu style={{margin:"0px 0px 15px 0px"}}>
        <Header style={{padding:"10px"}}>Messages</Header>
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
      addMessageToCurrentHousehold: (message) => dispatch({type:"ADD_MESSAGE_TO_CURRENTHOUSEHOLD", message})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(HouseholdMessagesContainer)