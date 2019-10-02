import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Segment, Form, Button, Message } from 'semantic-ui-react'

import { addContainer } from '../../../actions/containerActions.js'

const AddContainerForm = props => {

  const [ containerName, setContainerName ] = useState('')

  const [ containerDescription, setContainerDescription ] = useState('')

  const { space, setAddingContainer, addContainer } = props

  return(
    <Segment clearing raised style={{marginTop:"2%"}}>
      <Message header={"Add a Container to " + space.name} size="mini"/>
      <Form>
        <Form.Field>
          <label>Name</label>
          <input onChange={e => setContainerName(e.target.value)} name="newContainerName" placeholder="Container Name"/>
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <input onChange={e => setContainerDescription(e.target.value)} name="newContainerDescription" placeholder="Continer Description"/>
        </Form.Field>
        <Button onClick={() => setAddingContainer()} floated="right" size="mini">Cancel</Button>
        <Button onClick={() => {
          addContainer(containerName, containerDescription, space.id)
          setAddingContainer(false)
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
    addContainer: ( containerName, containerDescription, spaceId) => dispatch(addContainer( containerName, containerDescription, spaceId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddContainerForm);