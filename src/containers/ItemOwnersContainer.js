import React from 'react'
import { connect } from 'react-redux'
import { Segment, Message, Icon } from 'semantic-ui-react'

import { removeOwner } from '../actions/itemActions.js'

const ItemOwnersContainer = props => {
  const { item, removeOwner } = props

  const renderMessage = () => {
    return <Message>This item currently has no owners! Click Add Owners to give it some!</Message>
  }

  const renderOwners = () => {
    return item.users.map( user => {
      return <Segment key={user.id}>
        <div className='d-flex justify-content-between'>
          <span className='font-weight-bold'>{user.username}</span>

          <Icon link color="red" floated='right' name='cancel' onClick={()=> removeOwner(item.id, user.id)}/>
        </div>
      </Segment>
    })
  }

  return(
    <>
      {item.users.length === 0 ? renderMessage() :
        renderOwners()
      }
    </>
  )
};

const mapStateToProps = state => {
  return {
    item: state.item,
    user: state.user
   }
}

const mapDispatchToProps = dispatch => {
    return {
      removeOwner: (itemId, userId) => dispatch(removeOwner( itemId, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemOwnersContainer)