import React, { Component, } from 'react'
import { Card, Menu, Header, Form, Message, Segment, Button, Dropdown } from 'semantic-ui-react'
import MessageCard from './MessageCard.js'

import { connect } from 'react-redux'

class MessageContainer extends Component {

  state = {
    addingNewMessage: false,
    newMessageTitle: "",
    newMessageContent: "",
    newMessageHousehold_id: ""
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
    if (this.props.state.isDoneFetching) {

      let householdMessages = []

      this.props.state.user.households.forEach(household => {
        return householdMessages = [...householdMessages, household.messages].flat()
      })

        return householdMessages.map(message => {
          return <MessageCard key={message.id} message={message}/>
        })
      }
  }

  renderNewMessageForm = () => {
    let householdOptions = []

    if (this.props.state.user.households) {
      householdOptions = this.props.state.user.households.map(household => {
       return {key:household.name,text:household.name,value:household.id}
      })
    }

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
        <Form.Field>
        <label>Household</label>
          <Dropdown name="household" onChange={this.handleInput} pointing="top left" placeholder="Select Household" fluid selection options={householdOptions}/>
        </Form.Field>
        <Button onClick={this.setAddingNewMessage} floated="right">Cancel</Button>
        <Button onClick={this.addNewMessage} floated="right">Submit</Button>
      </Form>
    </Segment>
  }

  renderNewMessageHeader = () => {
    if (this.props.state.user.households.length === 0) {
      return <Message>No messages are being displayed because you do not currently belong to any households. You can create a household by clicking 'Add Household', or use the Search Icon above to search for a household to join</Message>
    }else {
      return <Button onClick={this.setAddingNewMessage} color="blue" size="mini" floated="right">Add Message</Button>
    }
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
          household_id: this.state.newMessageHousehold_id,
          user_id: this.props.state.user.id
        }
      })
    }).then(resp=>resp.json())
    .then(message=>{
      // console.log('addnewmessage fetch return',message)
      this.props.addMessage(message)
      this.setState({
        addingNewMessage: !this.state.addingNewMessage
      })
    })
  }


  render(){
    // console.log(this.props.state)
    return(
      <>
      <Segment clearing>
        <Header floated="left">Messages</Header>
        {this.state.addingNewMessage ? this.renderNewMessageForm():this.renderNewMessageHeader()}
      </Segment>
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
      setUserHouseholdMessages: (userHouseholdMessages) => dispatch({type:"SET_USERHOUSEHOLDMESSAGES", userHouseholdMessages}),
      addMessage: (message) => dispatch({type:"ADD_MESSAGE", message})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MessageContainer)


// <Menu style={{margin:"0px 0px 15px 0px"}}>
//   <Header style={{padding:"10px"}}>Messages</Header>
// </Menu>