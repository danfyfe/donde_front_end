import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Segment, Form, Button, Message } from 'semantic-ui-react'

import { editContainer } from '../../../actions/containerActions.js'

const EditContainerForm = props => {

  const { container, setEditingContainer, editContainer, space } = props

  const [ containerName, setContainerName ] = useState(container.name)
  const [ containerDescription, setContainerDescription ] = useState(container.description)


  return(
    <Segment clearing>
      <Message header={"Edit " + container.name} size="mini"/>
      <Form>
        <Form.Field>
          <label>New Name</label>
          <input onChange={e => setContainerName(e.target.value)} name="newSpaceName"
          value={containerName}
           placeholder={container.name}/>
        </Form.Field>
        <Form.Field>
          <label>New Description</label>
          <input onChange={e => setContainerDescription(e.target.value)}
         name="newSpaceName" placeholder={container.description}
         value={containerDescription}/>
        </Form.Field>
        <Button onClick={() => setEditingContainer(false)} floated="right" size="mini">Cancel</Button>
        <Button onClick={ () => {
          editContainer( containerName, containerDescription, container.id, space.id)
          setEditingContainer(false)
        }} floated="right" size="mini">Submit</Button>
      </Form>
    </Segment>
  )
}

const mapStateToProps = state => {
  return {
    household: state.household,
    space: state.space,
    container: state.container
   }
}

const mapDispatchToProps = dispatch => {
  return {
    editContainer: ( containerName, containerDescription, spaceId) => dispatch(editContainer( containerName, containerDescription, spaceId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditContainerForm)