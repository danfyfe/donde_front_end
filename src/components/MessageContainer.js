import React, { Component, } from 'react'
import { Card, Menu, Header } from 'semantic-ui-react'
import MessageCard from './MessageCard.js'


class MessageContainer extends Component {
  state = {
    messages:[]
  }
  componentDidMount(){
    fetch('http://localhost:3000/api/v1/messages')
    .then(resp=>resp.json())
    .then(messages=>{
      console.log("MESSAGES",messages)
      this.setState({
        messages: messages
      })
    })
  }

  renderMessageCards = () => {
    return this.state.messages.map(message => {
      return <MessageCard key={message.id} message={message}/>
    })
  }

  render(){
    console.log("MESSAGE CONTAINER", this.props)
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

export default MessageContainer