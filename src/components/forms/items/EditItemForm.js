import React, { useState } from 'react'
import { connect } from 'react-redux'
import { editItem } from '../../../actions/itemActions.js'
import { Segment, Form, Button, Message } from 'semantic-ui-react'

const EditItemForm = props => {
  const { item, setEditing, editItem } = props

  const [ itemName, setItemName ] = useState(item.name)

  const [ itemDescription, setItemDescription ] = useState(item.description)

  return(
    <Segment clearing raised style={{marginTop:"2%"}}>
      <Message header={"Edit " + item.name} size="mini"/>
        <Form>
          <Form.Field>
            <label>Name</label>
            <input onChange={e => setItemName(e.target.value)} name="itemName" placeholder="Item name"
            value={itemName}/>
          </Form.Field>

          <Form.Field>
            <label>Description</label>
            <input onChange={e => setItemDescription(e.target.value)} name="itemDescription" placeholder="Item description"
            value={itemDescription}/>
          </Form.Field>

          <Button onClick={() => setEditing(false)} floated="right" size="mini">Cancel</Button>
          <Button onClick={() => {
            editItem( item.id, itemName, itemDescription, item.container.id );
            setEditing(false)
          }} floated="right" size="mini">Submit</Button>
        </Form>
      </Segment>
  )
}

const mapStateToProps = state => {
  return {
    household: state.household,
    space: state.space,
    container: state.container,
    item: state.item
   }
}

const mapDispatchToProps = dispatch => {
  return {
    editItem: ( itemId, itemName, itemDescription, containerId ) => dispatch(editItem( itemId, itemName, itemDescription, containerId ))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditItemForm)