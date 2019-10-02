import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Segment, Header, Form, Dropdown, Button, Message, Menu } from 'semantic-ui-react'


import { moveItem } from '../../../actions/itemActions.js'

const MoveItemForm = props => {
  const { user, item, household, setMoving, moveItem } = props

  const [ containerId, setContainerId ] = useState()
  const [ spaceId, setSpaceId ] = useState()

  const itemHousehold = user.households.filter(household => {
    return household.id === item.household.id
  })[0]

  let spaceOptions = []
  let containerOptions = []

  spaceOptions = itemHousehold.spaces.map(space => {
    return {key:space.id, text:space.name, value: space.id}
  })

  containerOptions = itemHousehold.containers.map(container => {
    return {key: container.id, text: container.name, value: container.id}
  })

  return(<Segment clearing raised className='full-width'>
    <Form>

      <Form.Field>
        <label>Container</label>
        <Dropdown name="container_id" onChange={ (e,data) => setContainerId(data.value)} pointing="top left" placeholder={item.container.name} fluid selection options={containerOptions}/>
      </Form.Field>

      <Form.Field>
        <label>Space</label>
        <Dropdown name="space_id" onChange={(e,data) => setSpaceId(data.value)} pointing="top left" placeholder={item.space.name} fluid selection options={spaceOptions}/>
      </Form.Field>

      <Button onClick={() => setMoving(false)} floated="right" size="mini">Cancel</Button>
      <Button onClick={() => {
        moveItem( household.id, spaceId, containerId, item.id, item.name, item.description, user.id)
        setMoving(false)
      }} floated="right" size="mini">Submit</Button>

    </Form>
  </Segment>)
};


const mapStateToProps = state => {
  return {
    user: state.user,
    household: state.household,
    space: state.space,
    container: state.container,
    item: state.item
   }
}

const mapDispatchToProps = dispatch => {
  return {
    moveItem: ( householdId, spaceId, containerId, itemId, itemName, itemDescription, userId ) => dispatch( moveItem( householdId, spaceId, containerId, itemId, itemName, itemDescription, userId ))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoveItemForm)