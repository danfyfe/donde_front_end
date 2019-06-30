import React, { Component, } from 'react'
import { Button, Card, Icon, Image, Segment, Form, Message } from 'semantic-ui-react'


class MessageCard extends Component {
  state = {
    addingMessage: false,
    messageTitle: '',
    messageContent: ''
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
          user_id: this.props.user.id,
          household_id: this.props.message.household.id
        }
      })
    }).then(resp=>resp.json())
    .then(message=>{
      // console.log(message)
      this.props.renderNewMessage(message)
    })

  }

  render(){
    // console.log("MESSAGES PROPS",this.props.message)
    // console.log("MESSAGE STATE", this.state)
    // console.log("messageCard props", this.props)
    return(
      <Card color={this.props.household.color} style={{width: "100%"}}>
        <Card.Content>
          <Card.Header>
            {this.props.message.title}
            <Image floated="right"size="mini" src={this.props.household.image}/>
          </Card.Header>
          <Card.Description style={{margin:"10px"}}>
            {this.props.message.content}
          </Card.Description>
          <Card.Meta>
          <Icon name="home"/>
          <span style={{maring:'10px'}}>{this.props.household.name}</span>
          <Icon name="user"/>
          <span>FIGURE OUT HOW TO GET MESSAGE USER</span>
          {this.state.addingMessage ? null :<Button onClick={this.setAddingMessage}size="mini" floated="right"> Reply </Button>}
          </Card.Meta>
        </Card.Content>


        {this.state.addingMessage ?
        <Segment>
          <Message header="Add a Message!"/>
          <Form>
            <Form.Field>
              <label>Title</label>
                <input name="messageTitle"
                value={"re: "+this.props.message.title} placeholder="Title"
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
        </Segment>:null}


      </Card>
    )
  }



}

export default MessageCard

// <Card.Header>
//   Message Title
// </Card.Header>