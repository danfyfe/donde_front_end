import React from 'react'
import { Header } from 'semantic-ui-react'

const ItemLocationDetails = props => {

  const { item } = props

  return(
    <div className='small-padding'>
      <Header as="h4" floated="left" color="grey">in {item.container.name}</Header>
      <Header as="h4" floated="left" color="grey">in {item.space.name}</Header>
      <Header as="h4" floated="left" color="grey">at {item.household.name}</Header>
    </div>
  )
};

export default ItemLocationDetails