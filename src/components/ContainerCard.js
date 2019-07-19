import React, { Component } from 'react'
import { Segment, Card, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'

class ContainerCard extends Component {

  renderContainerItems = () => {
    if (this.props.container.items.length === 0) {
      return <Message warning>There are currently no items in this container! Click this card to view this container and add one!</Message>
    } else {
        return <span>{this.props.container.items.length} Items</span>
    }
  }

  render(){

    return(

      <Card link style={{width:"100%"}} onClick={()=>this.props.setCurrentContainer(this.props.container)}>
        <Card.Content>
          <Card.Header>{this.props.container.name}</Card.Header>
          <Card.Meta>{this.props.container.description}</Card.Meta>
        </Card.Content>

        <Segment style={{margin:"5px"}}>
        {this.renderContainerItems()}
        </Segment>


      </Card>
    )
  }
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
