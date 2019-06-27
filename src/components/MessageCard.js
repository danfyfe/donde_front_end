import React, { Component, } from 'react'
import { Segment, Form, Message, Button, Header, Card, Icon } from 'semantic-ui-react'


class MessageCard extends Component {
  render(){
    return(
      <Card color="yellow"style={{width: "100%"}}>
        <Card.Content>
          <Card.Header>
            Message Title
          </Card.Header>
          <Card.Description>
            Message Content
          </Card.Description>
          <Card.Meta>
          <Icon name="home"/>
            Household Name
          <Icon name="user"/>
            Username
            <Button float="right">Add Message</Button>
          </Card.Meta>
        </Card.Content>
      </Card>
    )
  }



}

export default MessageCard

// <Card.Header>
//   Message Title
// </Card.Header>