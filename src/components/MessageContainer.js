import React, { Component, } from 'react'
import { Card, Menu, Header } from 'semantic-ui-react'
import MessageCard from './MessageCard.js'

import { connect } from 'react-redux'

class MessageContainer extends Component {
  state = {
    messages: []
  }
  componentDidMount(){

    fetch('http://localhost:3000/api/v1/messages',{
      method: "GET",
      headers: { Authorization:  localStorage.getItem("token")}
    })
    .then(resp=>resp.json())
    .then(messages=>{
      // this.props.setUserHouseholdMessages(messages)
      // console.log("MESSAGES",messages)
      // this.setState({
      //   messages: messages
      // })
    })
  }

  // setUserHouseholdMessages = () => {
  //
  //   let userHouseholdMessages = []
  //
  //   if (this.props.state.user.households) {
  //     this.props.state.user.households.forEach(household => {
  //       // console.log(household)
  //       return userHouseholdMessages = [...userHouseholdMessages, household.messages]
  //     })
  //   }
  //
  //   this.setState({
  //     userHouseholdMessages: userHouseholdMessages.flat()
  //   })
  // }


  renderMessageCards = () => {

    if (this.props.state.user.households) {
      // console.log(this.props.user.households)
      // return this.props.state.user.households.map(household => {
      //   return household.messages.map(message => {
      //     return <MessageCard key={message.id} message={message} household={household}/>
      //   })
      // })
      let householdMessages = []

      this.props.state.user.households.forEach(household => {
        return householdMessages = [...householdMessages, household.messages].flat()
      })

      // console.log(householdMessages)
      return householdMessages.map(message => {
        return <MessageCard key={message.id} message={message}/>
      })
    }


  }

  renderNewMessage = (message) => {
    // const newMessages = [...this.state.messages, message]
    // this.setState({
    //   messages: newMessages
    // })

  }

  render(){

    console.log(this.props.state.user.households)
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
      setUserHouseholdMessages: (allMessages) => dispatch({type:"SET_USERHOUSEHOLDMESSAGES", allMessages}),
      addMessage: (message) => dispatch({type:"ADD_MESSAGE", message})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MessageContainer)