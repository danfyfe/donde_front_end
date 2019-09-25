import React, { Component } from 'react'
import { Form, Message, Segment, Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'

import HouseholdMessageCard from '../components/HouseholdMessageCard.js'


let API_ENDPOINT
if (process.env.NODE_ENV === 'production') {
  API_ENDPOINT = 'https://df-donde-api.herokuapp.com'
} else {
  API_ENDPOINT = 'http://localhost:3000'
}

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
    // if (this.props.state.user.households && this.props.state.currentHousehold) {
      if (this.props.household.messages) {
        if (this.props.household.messages.length === 0) {
          return <Message size="small" compact style={{margin: "2% auto"}}>There are no messages for this household! Click Add Message to create one!</Message>
        } else {
          let currentHouseholdMessages = this.props.household.messages

          currentHouseholdMessages.sort((a, b) => (a.created_at > b.created_at) ? 1 : -1).reverse()

          return currentHouseholdMessages.map(message => {
            return <HouseholdMessageCard key={message.id} message={message}/>
          })
        }
      }
    // }
  }

  renderNewMessageForm = () => {
    return <Segment clearing style={{width:'100%'}}>
    <Message header="Add a New Message!" size="mini"/>
      <Form>
        <Form.Field>
          <label>Title</label>
          <input onChange={this.handleInput} name="newMessageTitle" placeholder="Message Title"/>
        </Form.Field>
        <Form.Field>
          <label>Content</label>
          <input onChange={this.handleInput} name="newMessageContent" placeholder="Message Content"/>
        </Form.Field>
        <Button onClick={this.setAddingNewMessage} floated="right" size="mini">Cancel</Button>
        <Button onClick={this.addNewMessage} floated="right" size="mini">Submit</Button>
      </Form>
    </Segment>
  }

  renderNewMessageHeader = () => {
    return <Icon onClick={this.setAddingNewMessage} name="plus"/>
  }

  addNewMessage = () => {
    fetch(`${API_ENDPOINT}/api/v1/messages`,{
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

      this.props.addMessageToCurrentHousehold(message)

      this.setState({
        addingNewMessage: !this.state.addingNewMessage
      })
    })
  }



  render(){

    return(
      <Segment style={{margin:'1%'}}>
      <div className='d-flex flex-column'>

        <div className='d-flex flex-column justify-content-between full-width'>
          {this.state.addingNewMessage ? this.renderNewMessageForm():<>
            <div className='d-flex justify-content-between'>
              <span className='font-weight-bold larger-text' style={{height:'1vh'}}>Messages</span>
              {this.renderNewMessageHeader()}
            </div>
            </>
          }
        </div>

        <div className='d-flex flex-column' style={{marginTop:'3vh'}}>
          {this.renderMessageCards()}
        </div>

      </div>
        </Segment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    household: state.household
   }
}

const mapDispatchToProps = (dispatch) => {
    return {
      addMessageToCurrentHousehold: (message) => dispatch({type:"ADD_MESSAGE_TO_CURRENTHOUSEHOLD", message})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(HouseholdMessagesContainer)