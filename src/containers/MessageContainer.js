import React, { Component, } from 'react'
import { Form, Message, Segment, Button, Dropdown, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'

import MessageCard from '../components/MessageCard.js'
import AddMessageForm from '../components/forms/messages/AddMessageForm.js'

let API_ENDPOINT
if (process.env.NODE_ENV === 'production') {
  API_ENDPOINT = 'https://df-donde-api.herokuapp.com'
} else {
  API_ENDPOINT = 'http://localhost:3000'
}

class MessageContainer extends Component {

  state = {
    addingNewMessage: false
  }

  setAddingNewMessage = () => {
    this.setState({
      addingNewMessage: !this.state.addingNewMessage
    })
  }

  renderMessageCards = () => {
    if (this.props.state.isDoneFetching && this.props.state.user.households) {

      if (this.props.state.user.households.length === 0) {
          return <Message size="small" compact style={{margin: "2% auto 0 auto"}}>No messages are being displayed because you do not currently belong to any households. You can create a household by clicking 'Add Household', or use the Search Icon above to search for a household to join</Message>
      } else {
        let householdMessages = []

        this.props.state.user.households.forEach(household => {
          return householdMessages = [...householdMessages, household.messages].flat()
        })

        householdMessages.sort((a, b) => (a.created_at > b.created_at) ? 1 : -1).reverse()

        return householdMessages.map(message => {
          return <MessageCard key={message.id} message={message}/>
        })
        }
      }
  }

  renderNewMessageHeader = () => {
    if (this.props.state.user.households) {
        return <>
        <span className='font-weight-bold larger-text' style={{height:'1vh'}}>Messages</span>
        <Icon onClick={this.setAddingNewMessage} name='plus'/> </>
    }
  }

  render(){

    return(
      <>
      <div className='d-flex justify-content-between full-width'>
        {this.state.addingNewMessage ?
          <AddMessageForm households={this.props.state.user.households}
          setAddingNewMessage={this.setAddingNewMessage}
          userId={this.props.state.user.id}
          addMessage={this.props.addMessage}/>:
        <>{this.renderNewMessageHeader()}</>
      }
      </div>
      <div className='d-flex flex-column' style={{marginTop:'3vh'}}>
        {this.renderMessageCards()}
      </div>
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