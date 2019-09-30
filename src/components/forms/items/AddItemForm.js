import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Segment, Form, Button, Message, Dropdown } from 'semantic-ui-react'

import { addItem } from '../../../actions/itemActions.js'

const AddItemForm = props => {

  const [ itemName, setItemName ] = useState()
  const [ itemDescription, setItemDescription ] = useState()
  const [ itemOwners, setItemOwners ] = useState()

  const { household, container, setAddingItem, addItem } = props
  let currentHouseholdUsersOptions = {}

  if (household.users) {
    currentHouseholdUsersOptions = household.users.map(user => {
      return {key:user.id,text:user.username,value:user.id}
    })
  }

  return(

  <Segment clearing raised style={{marginTop:"2%"}}>
    <Message header={"Add an Item to " + container.name} size="mini"/>
      <Form>
        <Form.Field>
          <label>Name</label>
          <input onChange={e => setItemName(e.target.value)} name="itemName" placeholder="Item name"/>
        </Form.Field>

        <Form.Field>
          <label>Description</label>
          <input onChange={e => setItemDescription(e.target.value)} name="itemDescription" placeholder="Item description"/>
        </Form.Field>

        <Form.Field>
        <label>Owners</label>
          <Dropdown
          onChange = {( e, data ) => setItemOwners(data.value)}
          placeholder='Household Users'
          fluid
          multiple
          search
          selection
          options={currentHouseholdUsersOptions}
          />
        </Form.Field>

        <Button onClick={() => setAddingItem(false)} floated="right" size="mini">Cancel</Button>
        <Button onClick={() => {
          addItem( itemName, itemDescription, container.id, itemOwners);
          setAddingItem(false)
        }} floated="right" size="mini">Submit</Button>
      </Form>
    </Segment>
  )
};

const mapStateToProps = state => {
  return {
    household: state.household,
    space: state.space,
    container: state.container
   }
}

const mapDispatchToProps = dispatch => {
  return {
    addItem: ( itemName, itemDescription, containerId, itemOwners) => dispatch(addItem( itemName, itemDescription, containerId, itemOwners))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddItemForm)