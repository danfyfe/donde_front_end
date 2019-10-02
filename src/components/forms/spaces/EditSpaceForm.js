import React, { useState } from 'react'

import { Segment, Form, Button, Message } from 'semantic-ui-react'

import { connect } from 'react-redux'

import { editSpace } from '../../../actions/spaceActions.js'


const EditSpaceForm = props => {
  const { space, household, setEditingSpace, editSpace } = props

  const [ spaceName, setSpaceName ] = useState('')

  return(
    <Segment clearing>
      <Message header={"Edit " + space.name} size="mini"/>
      <Form>
        <Form.Field>
          <label>New Name</label>
          <input onChange={e => setSpaceName(e.target.value)} name="newSpaceName" placeholder={space.name}/>
        </Form.Field>
        <Button onClick={() => setEditingSpace(false)} floated="right" size="mini">Cancel</Button>
        <Button onClick={ () => {
          editSpace(space.id, household.id, spaceName)
          setEditingSpace(false)
        }} floated="right" size="mini">Submit</Button>
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
    editSpace: ( spaceId, householdId, spaceName ) => dispatch( editSpace(spaceId, householdId, spaceName))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditSpaceForm);