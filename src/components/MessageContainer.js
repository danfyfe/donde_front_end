import React, { Component, } from 'react'
import { Segment, Form, Message, Button, Header, Menu, Card } from 'semantic-ui-react'
import MessageCard from './MessageCard.js'


class MessageContainer extends Component {
  render(){
    return(
        <Card.Group>
          <MessageCard/>
          <MessageCard/>
          <MessageCard/>
          <MessageCard/>
        </Card.Group>
    )
  }
}

export default MessageContainer