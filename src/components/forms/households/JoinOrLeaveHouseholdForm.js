import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'

import { joinHousehold } from '../../../actions/householdActions.js'


const JoinOrLeaveHouseholdForm = props => {

  const { type, householdId, userId, setJoiningHousehold } = props
  const [ householdPass, setHouseholdPass ] = useState('')

  return(
    <>
      <Form>
        <Form.Field>
          <label>Password</label>
          <input type="password" name="householdPassword" onChange={e => setHouseholdPass(e.target.value)} placeholder={`Enter household password to ${type}!`}/>
        </Form.Field>
        <Button floated="right" size="mini"
        onClick={() => setJoiningHousehold(false)}>Cancel</Button>
        <Button floated="right" size="mini" onClick={() => {
          props.joinHousehold( userId, householdId, householdPass )
        }}>Submit</Button>
      </Form>
    </>
  )
}

const mapStateToProps = state => {
  return {
    household: state.household
  }
}

const mapDispatchToProps = dispatch => {
  return {
    joinHousehold: (userId, householdId, householdPass) => dispatch(joinHousehold(userId, householdId, householdPass))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinOrLeaveHouseholdForm)