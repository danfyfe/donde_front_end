import React, { useState } from 'react'
import { connect } from 'react-redux'
import { editItem } from '../../../actions/itemActions.js'
import { Segment, Form, Button, Dropdown } from 'semantic-ui-react'
import { addOwners } from '../../../actions/itemActions.js'

const AddOwnersForm = props => {

  const { user, item, setAddingOwners, addOwners } = props
  const [ owners, setOwners ] = useState()

  let currentItemHousehold = {}

  currentItemHousehold = user.households.filter(household => {
      return household.id === item.household.id
    })[0]

  let currentItemHouseholdUsersOptions = {}

   currentItemHouseholdUsersOptions = currentItemHousehold.users.map(user => {
    return { key:user.id, text:user.username, value:user.id}
  })

  return(
    <Segment clearing raised className='full-width'>
      <Form>
        <Form.Field>
        <label>Owners to be added</label>
          <Dropdown
          onChange = {(e, data) => setOwners(data.value)}
          placeholder='Household Users'
          fluid
          multiple
          search
          selection
          options={currentItemHouseholdUsersOptions}
          />
        </Form.Field>
        <Button onClick={() => setAddingOwners(false)} floated="right" size="mini">Cancel</Button>
        <Button onClick={ () => {
          addOwners(item.id, owners)
          setAddingOwners(false)
          }
        }
        floated="right" size="mini">Submit</Button>
      </Form>
    </Segment>
  )
}

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
    addOwners: ( itemId, owners ) => dispatch(addOwners( itemId, owners ))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddOwnersForm)