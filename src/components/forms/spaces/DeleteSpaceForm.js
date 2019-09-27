import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Segment, Form, Button, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { deleteSpace } from '../../../actions/spaceActions.js'
import { getCurrentHousehold } from '../../../actions/householdActions.js'

const DeleteSpaceForm = props => {

  const { deleteSpace, space, household, setDeletingSpace } = props

  const [ householdPass, setHouseholdPass ] = useState('')

  return(
    <Segment clearing>
      <Message header={"Delete " + space.name} size="mini"/>
      <Form>
        <Form.Field>
          <label>Household Password</label>
          <input onChange={ e => setHouseholdPass(e.target.value)} name="householdPassword" type="password" placeholder="Household Password"/>
        </Form.Field>
        <Button onClick={() => setDeletingSpace(false)} floated="right" size="mini">Cancel</Button>
        <Button onClick={() => {
          deleteSpace(space.id, household.id, householdPass)
          setDeletingSpace(false)
          props.setCurrentHousehold(household.id)
          props.setCurrentSpace({})
        }} floated="right" size="mini" color="red">Delete Space</Button>
      </Form>
    </Segment>
  )
};

const mapStateToProps = state => {
  return {
    space: state.space,
    household: state.household
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteSpace: (spaceId, householdId, householdPass) => dispatch(deleteSpace(spaceId, householdId, householdPass)),
    setCurrentHousehold: (householdId) => dispatch(getCurrentHousehold(householdId)),
    setCurrentSpace: space => dispatch({type:"SET_CURRENT_SPACE", space}),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DeleteSpaceForm));