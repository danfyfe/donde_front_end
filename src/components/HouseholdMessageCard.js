import React, { Component } from 'react'
import { Segment, Card, Form, Icon, Image, Message, Button } from 'semantic-ui-react'

import { connect } from 'react-redux'
import moment from 'moment'

let API_ENDPOINT
if (process.env.NODE_ENV === 'production') {
  API_ENDPOINT = 'https://df-donde-api.herokuapp.com'
} else {
  API_ENDPOINT = 'http://localhost:3000'
}

class HouseholdMessageCard extends Component {
  state = {
    addingMessage: false,
    messageTitle: 're: '+this.props.message.title,
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

  handleTitleInput = (e) => {
    console.log(e.target.value)
    this.setState({
      messageTitle: e.target.value
    })
  }


  addMessage = () => {
    fetch(`${API_ENDPOINT}/api/v1/messages`,{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
        Accept: 'application/json'
      },
      body:JSON.stringify({
        message:{
          title: this.state.messageTitle,
          content: this.state.messageContent,
          user_id: this.props.state.user.id,
          household_id: this.props.message.household.id
        }
      })
    }).then(resp=>resp.json())
    .then(message=>{
      this.props.addMessageToCurrentHousehold(message)
      this.setState({
        addingMessage: !this.state.addingMessage
      })
    })

  }

  render(){

    return(
      <Card color={this.props.message.household.color} style={{width: "100%"}}>
        <Card.Content>
          <Card.Header>
            {this.props.message.title}
            <Image floated="right"size="mini" style={{width:'20px', height:'20px'}} src={this.props.message.household.image}/>
          </Card.Header>
          <Card.Description style={{margin:"10px", fontSize:'85%'}}>
            {this.props.message.content}
          </Card.Description>
          <Card.Meta>
          <Icon name="home"/>
          <span style={{maring:'10px', fontSize:'75%'}}>{this.props.message.household.name}</span>
          <Icon name="user"/>
          <span style={{fontSize:'75%'}}>{this.props.message.user.username}</span>
          <Icon name="clock"/>
          <span style={{fontSize:'75%'}}>{moment(this.props.message.created_at).format('MMMM Do YYYY, h:mm a')}</span>
          {this.state.addingMessage ? null :<Button onClick={this.setAddingMessage}size="mini" floated="right"> Reply </Button>}
          </Card.Meta>
        </Card.Content>

        {this.state.addingMessage ?
        <Segment>
          <Message header="Reply to Message!"/>
          <Form>
            <Form.Field>
              <label>Title</label>
                <input name="messageTitle"
                value={this.state.messageTitle} placeholder="Title"
                onChange={this.handleTitleInput}/>
            </Form.Field>
            <Form.Field>
              <label>Message</label>
                <input name="messageContent" placeholder="Message"
                onChange={this.handleMessageInput}/>
            </Form.Field>

            <Button size='mini'floated="right" onClick={this.setAddingMessage}>Cancel</Button>
            <Button size='mini'floated="right"
            onClick={this.addMessage}>Submit</Button>
          </Form>
        </Segment>:null}
      </Card>
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

export default connect(mapStateToProps,mapDispatchToProps)(HouseholdMessageCard)