import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Form, Message, Segment, Button, Dropdown } from 'semantic-ui-react'

import { addMessage } from '../../../actions/messageActions.js'
import { getUser } from '../../../actions/userActions.js'

const AddMessageForm = props => {

  const { households, setAddingNewMessage, addMessage, household, user, type, setUser } = props

  const [ messageTitle, setMessageTitle ] = useState('')
  const [ messageContent, setMessageContent ] = useState('')
  const [ householdId, setHouseholdId ] = useState(household.id)

  let householdOptions = households.map(household => {
      return {key:household.name, text:household.name, value:household.id}
    })

  return(<>
    <Segment clearing raised style={{width:'100%'}}>
      <Message header="Add New Message!" size="mini"/>
        <Form>
          <Form.Field>
            <label>Title</label>
            <input onChange={e => setMessageTitle(e.target.value)} name="newMessageTitle" placeholder="Message Title"/>
          </Form.Field>
          <Form.Field>
            <label>Content</label>
            <input onChange={e => setMessageContent(e.target.value)} name="newMessageContent" placeholder="Message Content"/>
          </Form.Field>
          { type === 'user' ? <Form.Field>
          <label>Household</label>
            <Dropdown name="household" onChange={(e, data) => setHouseholdId(data.value)} pointing="top left" placeholder="Select Household" fluid selection options={householdOptions}/>
          </Form.Field> : null}

          <Button onClick={() => setAddingNewMessage(false)} floated="right" size="mini">Cancel</Button>
          <Button onClick={() => {
            addMessage(messageTitle, messageContent, householdId, user.id, type)
            setAddingNewMessage(false)
          }} floated="right" size="mini">Submit</Button>
        </Form>
    </Segment>
    </>
  )
}

const mapStateToProps = state => {
  return {
    household: state.household,
    space: state.space,
    container: state.container,
    user: state.user
   }
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: () => dispatch(getUser()),
    addMessage: ( messageTitle, messageContent, householdId, userId, type) => dispatch(addMessage(messageTitle, messageContent, householdId, userId, type))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMessageForm)