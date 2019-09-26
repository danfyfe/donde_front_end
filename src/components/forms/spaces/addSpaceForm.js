import React, { useState } from 'react'
import { Segment, Form, Button, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'

import { addSpace } from '../../../actions/spaceActions.js'

const AddSpaceForm = props => {

  const { householdId, householdName, setAddingSpace, addSpace } = props

  const [ spaceName, setSpaceName ] = useState('')

  return(
    <Segment clearing raised style={{marginTop:"3%"}}>
      <Message header={"Add a space to " + householdName} size="mini"/>
      <Form>
        <Form.Field>
          <label>Name</label>
          <input onChange={ e => setSpaceName(e.target.value)} name="newSpaceName" placeholder="Space Name"/>
        </Form.Field>
        <Button floated="right" size="mini"
         onClick={() => setAddingSpace(false)}>Cancel</Button>
        <Button floated="right" size="mini"
        onClick={ () => {
          addSpace(householdId, spaceName)
          setAddingSpace(false)
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
    addSpace: ( householdId, spaceName ) => dispatch(addSpace( householdId, spaceName ))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSpaceForm)