import React, { useState } from 'react'
import { Form, Message, Segment, Button, Dropdown } from 'semantic-ui-react'

import apiEndpoint from '../../../actions/ApiEndpoint.js'

const AddMessageForm = props => {

  const [ messageTitle, setMessageTitle ] = useState('')
  const [ messageContent, setMessageContent ] = useState('')
  const [ messageHouseholdId, setMessageHouseholdId ] = useState('')

  const { households, setAddingNewMessage, userId, addMessage } = props

  let householdOptions = households.map(household => {
      return {key:household.name, text:household.name, value:household.id}
    })

  const addNewMessage = () => {
    fetch(`${apiEndpoint}/messages`,{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
        Accept: 'application/json'
      },
      body:JSON.stringify({
        message:{
          title: messageTitle,
          content: messageContent,
          household_id: messageHouseholdId,
          user_id: userId
        }
      })
    }).then(resp=>resp.json())
    .then(message=>{
      addMessage(message)
      setAddingNewMessage(false)
    })
  }

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
          <Form.Field>
          <label>Household</label>
            <Dropdown name="household" onChange={(e, data) => setMessageHouseholdId(data.value)} pointing="top left" placeholder="Select Household" fluid selection options={householdOptions}/>
          </Form.Field>
          <Button onClick={() => setAddingNewMessage(false)} floated="right" size="mini">Cancel</Button>
          <Button onClick={addNewMessage} floated="right" size="mini">Submit</Button>
        </Form>
    </Segment>
    </>
  )
}

export default AddMessageForm