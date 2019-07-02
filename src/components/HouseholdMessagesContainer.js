import React, { Component } from 'react'
import { Header, Menu, Card, Form, Message, Segment, Button } from 'semantic-ui-react'
import HouseholdMessageCard from './HouseholdMessageCard.js'
import { connect } from 'react-redux'

class HouseholdMessagesContainer extends Component {

  state = {
    addingNewMessage: false,
    newMessageTitle: "",
    newMessageContent: "",
  }

  handleInput = (e) => {
    let newMessageHouseholdObj = {}

    if (e.target.innerText) {
      if (this.props.state.user.households) {
        newMessageHouseholdObj = this.props.state.user.households.find(household=>{
          return household.name === e.target.innerText
        })
      }
    }

    this.setState({
      [e.target.name]: e.target.value,
      newMessageHousehold_id: newMessageHouseholdObj.id
    })
  }

  setAddingNewMessage = () => {
    this.setState({
      addingNewMessage: !this.state.addingNewMessage
    })
  }

  renderMessageCards = () => {
    if (this.props.state.user.households && this.props.state.currentHousehold) {
      return this.props.state.currentHousehold.messages.map(message => {
        return <HouseholdMessageCard key={message.id} message={message}/>
      })
    }
  }

  renderNewMessageForm = () => {
    return <Segment clearing>
    <Message>Add New Message!</Message>
      <Form>
        <Form.Field>
          <label>Title</label>
          <input onChange={this.handleInput} name="newMessageTitle" placeholder="Message Title"/>
        </Form.Field>
        <Form.Field>
          <label>Content</label>
          <input onChange={this.handleInput} name="newMessageContent" placeholder="Message Content"/>
        </Form.Field>
        <Button onClick={this.setAddingNewMessage} floated="right">Cancel</Button>
        <Button onClick={this.addNewMessage} floated="right">Submit</Button>
      </Form>
    </Segment>
  }

  renderNewMessageHeader = () => {
    return <Header onClick={this.setAddingNewMessage} style={{padding:"10px", color:"blue"}}>Add Message</Header>
  }

  addNewMessage = () => {
    fetch('http://localhost:3000/api/v1/messages',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
        Accept: 'application/json'
      },
      body:JSON.stringify({
        message:{
          title: this.state.newMessageTitle,
          content: this.state.newMessageContent,
          household_id: this.props.state.currentHousehold.id,
          user_id: this.props.state.user.id
        }
      })
    }).then(resp=>resp.json())
    .then(message=>{
      // console.log('addnewmessage fetch return',message)
      this.props.addMessageToCurrentHousehold(message)
      this.setState({
        addingNewMessage: !this.state.addingNewMessage
      })
    })
  }



  render(){

    return(
      <>
      <Menu style={{margin:"0px 0px 15px 0px"}}>
        <Header style={{padding:"10px"}}>Messages</Header>
      </Menu>
      {this.state.addingNewMessage ? this.renderNewMessageForm():this.renderNewMessageHeader()}
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