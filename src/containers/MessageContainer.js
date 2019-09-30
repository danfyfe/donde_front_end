import React, { Component, } from 'react'
import { Message, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'

import MessageCard from '../components/MessageCard.js'
import AddMessageForm from '../components/forms/messages/AddMessageForm.js'

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
    if (this.props.user.households.length === 0) {
        return <Message size="small" compact style={{margin: "2% auto 0 auto"}}>No messages are being displayed because you do not currently belong to any households. You can create a household by clicking 'Add Household', or use the Search Icon above to search for a household to join</Message>
    } else {

      let householdMessages = []

      this.props.user.households.forEach(household => {
        return householdMessages = [...householdMessages, household.messages].flat()
      })

      householdMessages.sort((a, b) => (a.created_at > b.created_at) ? 1 : -1).reverse()
      if (householdMessages.length === 0) {
        return <Message size="small" compact style={{margin: "2% auto 0 auto"}}>There are currently no messages! Click the 'plus' icon above to add one!</Message>
      } else {
        return householdMessages.map(message => {
          return <MessageCard key={message.id} message={message}/>
        })
      }
    }
  }

  renderNewMessageHeader = () => {
    if (this.props.user.households) {
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
          <AddMessageForm households={this.props.user.households}
          setAddingNewMessage={this.setAddingNewMessage}
          userId={this.props.user.id}
          addMessage={this.props.addMessage}
          type={'user'}/>
          :
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
  return {
    user: state.user
  }
}


const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MessageContainer)