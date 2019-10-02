import React, { useState } from 'react'
import { Segment, Button, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'

import { joinHousehold, leaveHousehold } from '../../../actions/householdActions.js'


const JoinOrLeaveHouseholdForm = props => {

  const { type, householdId, userId, setJoiningHousehold, setLeavingHousehold } = props

  // console.log('householdID',householdId, 'userId', userId, 'type', type)

  const [ householdPass, setHouseholdPass ] = useState('')

  const handleSetStateToFalse = type => {
    if (type === 'join') {
      setJoiningHousehold(false)
    } else if (type === 'leave') {
      setLeavingHousehold(false)
    }
  }

  const handleJoinOrLeave = type => {
    if (type === 'join') {
      props.joinHousehold( userId, householdId, householdPass )
      setJoiningHousehold(false)
    } else if (type === 'leave') {
      props.leaveHousehold( userId, householdId, householdPass )
      setLeavingHousehold(false)
    }
  }

  return(
    <Segment clearing raised>
      <Form>
        <Form.Field>
          <label>Password</label>
          <input type="password" name="householdPassword" onChange={e => setHouseholdPass(e.target.value)} placeholder={`Enter household password to ${type}!`}/>
        </Form.Field>
        <Button floated="right" size="mini"
        onClick={() => {
          handleSetStateToFalse(type)
        }}>Cancel</Button>
        <Button floated="right" size="mini" onClick={() => {
          handleJoinOrLeave(type)
        }}>Submit</Button>
      </Form>
    </Segment>
  )
}

const mapStateToProps = state => {
  return {
    household: state.household
  }
}

const mapDispatchToProps = dispatch => {
  return {
    joinHousehold: (userId, householdId, householdPass) => dispatch(joinHousehold(userId, householdId, householdPass)),
    leaveHousehold: (userId, householdId, householdPass) => dispatch(leaveHousehold(userId, householdId, householdPass))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinOrLeaveHouseholdForm)