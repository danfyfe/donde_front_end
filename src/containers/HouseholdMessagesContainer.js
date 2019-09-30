import React, { Component } from 'react'
import { Message, Segment, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'

import HouseholdMessageCard from '../components/HouseholdMessageCard.js'
import AddMessageForm from '../components/forms/messages/AddMessageForm.js'

class HouseholdMessagesContainer extends Component {

  state = {
    addingNewMessage: false,
    newMessageTitle: "",
    newMessageContent: "",
  }

  setAddingNewMessage = () => {
    this.setState({
      addingNewMessage: !this.state.addingNewMessage
    })
  }

  renderMessageCards = () => {
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
  }

  renderNewMessageHeader = () => {
    return <Icon onClick={this.setAddingNewMessage} name="plus"/>
  }

  render(){
    return(
      <Segment style={{margin:'1%'}}>
      <div className='d-flex flex-column'>
        <div className='d-flex flex-column justify-content-between full-width'>
          {this.state.addingNewMessage ? <AddMessageForm households={this.props.user.households}
          setAddingNewMessage={this.setAddingNewMessage}
          userId={this.props.user.id}
          addMessage={this.props.addMessage}
          type={'household'} />:<>
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