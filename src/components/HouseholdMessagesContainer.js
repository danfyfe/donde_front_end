import React, { Component } from 'react'
import { Segment, Header, Menu, Card } from 'semantic-ui-react'
import MessageCard from './MessageCard.js'
import { connect } from 'react-redux'

class HouseholdMessagesContainer extends Component {
  state = {
    messages:[]
  }


  renderMessageCards = () => {
    // return this.state.messages.map(message => {
    //   return <MessageCard user={this.props.user}key={message.id} message={message} renderNewMessage={this.renderNewMessage}/>
    // })
    // return this.props.household.messages.map(message=>{
    //   console.log(message)
    // })
    // console.log("RMC",this.props.household.messages)

  }

  renderNewMessage = (message) => {
    const newMessages = [...this.state.messages, message]
    this.setState({
      messages: newMessages
    })
  }

  setHouseholdMessages = () => {
    const householdMessages = this.state.messages.filter(message=>{
      return  message.household_id === this.props.household.id
    })
    // console.log("HH MESSAGE CONTAINER", householdMessages)
    this.setState({
      messages: householdMessages
    })
  }

  render(){
    // this.setHouseholdMessages()
    // console.log("HHMC", this.props)
    return(
      <>
      <Menu style={{margin:"0px 0px 15px 0px"}}>
        <Header style={{padding:"10px"}}>{this.state.messages.length} Messages</Header>
      </Menu>
        <Card.Group>
          {this.renderMessageCards()}
        </Card.Group>
      </>
    )
  }
}

// const mapStateToProps = (state) => {
//   console.log("MSTP",state)
//   return {}
// }
//
// const mapDispatchToProps = () => {
//
// }

export default HouseholdMessagesContainer