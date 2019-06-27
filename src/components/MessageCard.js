import React, { Component, } from 'react'
import { Button, Card, Icon, Image } from 'semantic-ui-react'


class MessageCard extends Component {
  render(){
    console.log("MESSAGES PROPS",this.props)
    return(
      <Card color={this.props.message.household.color} style={{width: "100%"}}>
        <Card.Content>
          <Card.Header>
            {this.props.message.title}
            <Image floated="right"size="mini" src={this.props.message.household.image}/>
          </Card.Header>
          <Card.Description style={{margin:"10px"}}>
            {this.props.message.content}
          </Card.Description>
          <Card.Meta>
          <Icon name="home"/>
          <span style={{maring:'10px'}}>{this.props.message.household.name}</span>
          <Icon name="user"/>
          <span>{this.props.message.user.username}</span>
          <Button size="mini" floated="right">Add Message</Button>
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