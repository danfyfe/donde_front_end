import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Segment, Form, Button } from 'semantic-ui-react'
import { getCurrentHousehold } from '../../../actions/householdActions.js'
import { deleteItem } from '../../../actions/itemActions.js'

const DeleteItemForm = props => {

  const [ householdPass, setHouseholdPass ] = useState()

  const { deleteItem, setDeleting, item, household, history, user } = props

  return(
    <Segment clearing>
      <Form>
        <Form.Field>
          <label>Please enter household password to delete item</label>
          <input onChange={e => setHouseholdPass(e.target.value)} name="householdPassword" type="password" placeholder="Household password"/>
        </Form.Field>
        <Button floated="right" size="mini" onClick={() => setDeleting(false)}>Cancel</Button>
        <Button floated="right" size="mini" color="red" onClick={() => {
          deleteItem(item.id, householdPass, user.id)
          history.push(`/households/${household.id}`)
        }}>Delete Item</Button>
      </Form>
    </Segment>
  )
};

const mapStateToProps = state => {
  return {
    user: state.user,
    space: state.space,
    household: state.household,
    item: state.item
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteItem: (itemId, householdId, householdPass) => dispatch(deleteItem(itemId, householdId, householdPass)),
    setCurrentHousehold: (householdId) => dispatch(getCurrentHousehold(householdId)),
    setCurrentSpace: space => dispatch({type:"SET_CURRENT_SPACE", space}),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DeleteItemForm))