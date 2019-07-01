import React, { Component } from 'react'
import { Header, Menu, Card } from 'semantic-ui-react'
import HouseholdMessageCard from './HouseholdMessageCard.js'
import { connect } from 'react-redux'

class HouseholdMessagesContainer extends Component {
  state = {
    messages:[]
  }


  renderMessageCards = () => {
    if (this.props.state.currentHousehold.messages) {
      return this.props.state.currentHousehold.messages.map(message => {
          return <HouseholdMessageCard message={message} household={this.props.state.currentHousehold}/>
        })
    }

  }

  renderNewMessage = (message) => {
    const newMessages = [...this.state.messages, message]
    this.setState({
      messages: newMessages
    })
  }

  render(){
    // this.setHouseholdMessages()
    // console.log("HHMC", this.props.state.currentHousehold.messages)
    return(
      <>
      <Menu style={{margin:"0px 0px 15px 0px"}}>
        <Header style={{padding:"10px"}}>Messages</Header>
      </Menu>
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

}

export default connect(mapStateToProps,mapDispatchToProps)(HouseholdMessagesContainer)