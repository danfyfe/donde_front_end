import React from 'react'
import { Header } from 'semantic-ui-react'

const ItemDescription = props => {

  const { itemDescription } = props

  return(
    <div className='small-padding'>
      <Header as='h6'>{itemDescription}</Header>
    </div>
  )
};

export default ItemDescription