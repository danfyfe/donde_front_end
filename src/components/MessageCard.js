import React, { Component, } from 'react'
import { Button, Card, Icon, Image, Segment, Form, Message } from 'semantic-ui-react'


class MessageCard extends Component {
  state = {
    addingMessage: false,
    messageTitle: '',
    messageContent: ''
    // newMessageUserId: this.props.message.user.id,
    // newMessageHouseholdId: this.props.message.household.id,

  }

  setAddingMessage = () => {
    this.setState({
      addingMessage: !this.state.addingMessage
    })
  }

  handleMessageInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  addMessage = () => {
    fetch('http://localhost:3000/api/v1/messages',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
        Accept: 'application/json'
      },
      body:JSON.stringify({
        message:{
          title: this.state.messageTitle,
          content: this.state.messageContent,
          user_id: this.props.message.user.id,
          household_id: this.props.message.household.id
        }
      })
    }).then(resp=>resp.json())
    .then(message=>{
      console.log(message)
    })

  }

  render(){
    // console.log("MESSAGES PROPS",this.props)
    console.log("MESSAGE STATE", this.state)
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
          {this.state.addingMessage ? null :<Button onClick={this.setAddingMessage}size="mini" floated="right">Add Message</Button>}
          </Card.Meta>
        </Card.Content>



        <Segment>
        <Message header="Add a Message!"/>
          <Form>
            <Form.Field>
              <label>Title</label>
                <input name="messageTitle" placeholder="Title"
                onChange={this.handleMessageInput}/>
            </Form.Field>
            <Form.Field>
              <label>Message</label>
                <input name="messageContent" placeholder="Message"
                onChange={this.handleMessageInput}/>
            </Form.Field>

            <Button size='small'floated="right" onClick={this.setAddingMessage}>Cancel</Button>
            <Button size='small'floated="right"
            onClick={this.addMessage}>Submit</Button>
          </Form>
        </Segment>


      </Card>
    )
  }



}

export default MessageCard

// <Card.Header>
//   Message Title
// </Card.Header>