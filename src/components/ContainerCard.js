import React from 'react'
import { Segment, Card, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'

function ContainerCard(props){

  const renderContainerItems = () => {

    if (props.container.items) {
      if (props.container.items.length === 0) {
        return <Message warning>There are currently no items in this container! Click this card to view this container and add one!</Message>
      } else {
        return <span>{props.container.items.length} Items</span>
      }
    } else {
      let containerItems = props.state.currentSpace.items.filter(item => {
        return item.container.id === props.container.id
      })
      return <span>{containerItems.length} Items</span>
    }
  }


    return(

      <Card link style={{width:"100%"}} onClick={() => props.setCurrentContainer(props.container)}>
        <Card.Content>
          <Card.Header>{props.container.name}</Card.Header>
          <Card.Meta>{props.container.description}</Card.Meta>
        </Card.Content>

        <Segment style={{margin:"5px"}}>
        {renderContainerItems()}
        </Segment>


      </Card>
    )

}

const mapStateToProps = (state) => {
  return { state }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    setCurrentContainer: (container) => {
      dispatch({type:"SET_CURRENT_CONTAINER", container})
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ContainerCard)
