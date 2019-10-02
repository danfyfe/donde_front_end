import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Segment, Form, Button } from 'semantic-ui-react'

import { deleteContainer } from '../../../actions/containerActions.js'

const DeleteContainerForm = props => {

  const { container, household, setDeletingContainer, deleteContainer, setCurrentContainer } = props

  const [ householdPass, setHouseholdPass ] = useState('')

  return(
    <Segment clearing raised>
      <Form>
        <Form.Field>
          <title>Password</title>
          <input type="password" name="householdPassword" onChange={e => setHouseholdPass(e.target.value)} placeholder="Please enter Household Password"/>
        </Form.Field>
        <Button floated="right" size="mini"
        onClick={() => setDeletingContainer(false)}>Cancel</Button>
        <Button floated="right" size="mini" onClick={() => {
          deleteContainer( container.id, household.id, householdPass);
          setDeletingContainer(false);
          setCurrentContainer({})
        }} color="red">Delete Container</Button>
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
    deleteContainer: (containerId, householdId, householdPass) => dispatch(deleteContainer(containerId, householdId, householdPass)),
    setCurrentContainer: (container) => dispatch({type:"SET_CURRENT_CONTAINER", container})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteContainerForm)
