import React from 'react'
// import {  Card, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'

function ContainerCard(props){

  const { container } = props

  // const renderContainerItems = () => {
  //   if (container.items) {
  //     if (container.items.length === 0) {
  //       return <Message warning>There are currently no items in this container! Click this card to view this container and add one!</Message>
  //     } else {
  //       return <span>{container.items.length} Items</span>
  //     }
  //   } else {
  //     let containerItems = props.state.currentSpace.items.filter(item => {
  //       return item.container.id === props.container.id
  //     })
  //     return <span>{containerItems.length} Items</span>
  //   }
  // }


    return(
      <div className='df-card' onClick={() => props.setCurrentContainer(container)}>
        <span className='font-weight-bold small-padding'>{container.name}</span>
      </div>
    )

}

const mapStateToProps = (state) => {
  return {
    state
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    setCurrentContainer: container => {
      dispatch({type:"SET_CURRENT_CONTAINER", container})
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ContainerCard)

//
// <Card link style={{width:"100%"}} onClick={() => props.setCurrentContainer(container)}>
//   <Card.Content>
//     <Card.Header>{container.name}</Card.Header>
//     <Card.Meta>{container.description}</Card.Meta>
//   </Card.Content>
//
//   <Segment style={{margin:"5px"}}>
//     {renderContainerItems()}
//   </Segment>
//
// </Card>