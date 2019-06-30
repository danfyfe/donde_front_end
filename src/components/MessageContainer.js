import React, { Component, } from 'react'
import { Card, Menu, Header } from 'semantic-ui-react'
import MessageCard from './MessageCard.js'

import { connect } from 'react-redux'

class MessageContainer extends Component {
  state = {
    messages:[]
  }
  componentDidMount(){

    fetch('http://localhost:3000/api/v1/messages',{
      method: "GET",
      headers: { Authorization:  localStorage.getItem("token")}
    })
    .then(resp=>resp.json())
    .then(messages=>{
      this.props.setMessages(messages)
      // console.log("MESSAGES",messages)
      this.setState({
        messages: messages
      })
    })
  }

  // renderMessageCards = () => {
  //   // console.log(this.props.state.messages)
  //   // if (this.props.state.messages) {
  //     // return this.props.state.messages.map(message => {
  //     //   return <MessageCard user={this.props.user}key={message.id} message={message} renderNewMessage={this.renderNewMessage}/>
  //     // })
  //   // }
  // }

  renderNewMessage = (message) => {
    const newMessages = [...this.state.messages, message]
    this.setState({
      messages: newMessages
    })
  }

  render(){
    const renderMessageCards = () =>{
      // console.log("MESSAGE CARD",this.props.state.messages)
    }
    // console.log("MESSAGE CONTAINER", this.props)
    // console.log(this.props.state.messages)
    return(
      <>
      <Menu style={{margin:"0px 0px 15px 0px"}}>
        <Header style={{padding:"10px"}}>{this.props.state.messages.length} Messages</Header>
      </Menu>
        <Card.Group>
          {renderMessageCards()}
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
      setHouseholds: (households) => dispatch({type:"SET_HOUSEHOLDS",households}),
      addHousehold: (household) => dispatch({type:"ADD_HOUSEHOLD", household}),
      setMessages: (messages) => dispatch({type:"SET_MESSAGES",messages})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MessageContainer)