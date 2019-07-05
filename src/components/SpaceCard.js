import React, { Component } from 'react'
import { Segment, Card, List } from 'semantic-ui-react'
import { connect } from 'react-redux'

class SpaceCard extends Component {

  renderContainerDescriptions = () => {
      return this.props.space.containers.map(container => {
        return <>
        <Card link>
            <Card.Content header={container.name}/>
            <Card.Content meta={container.description}/>
            <Card.Content extra>
              {container.items.length} Items
            </Card.Content>
        </Card>
        </>
      })
  }

  renderSpaceItems = () => {
    return this.props.space.items.map(item => {
      return <Segment>
      <List.Item>
      <List.Content>{item.name}</List.Content>
      </List.Item>
      </Segment>
    })
  }

  render(){
    // console.log("SPACECARD",this.props.space)
    return(

      <Card link onClick={()=>{this.props.setCurrentSpace(this.props.space)}}>
        <Card.Content header={this.props.space.name}/>
        <Card.Group itemsPerRow={6}>
        {this.renderContainerDescriptions()}
        </Card.Group>

      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return { state }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    setUser: (user) => dispatch({type:"SET_USER", user}),
    setCurrentHousehold: (household) => dispatch({type:"SET_CURRENT_HOUSEHOLD", household}),
    addSpace: (space) => dispatch({type:"ADD_SPACE", space}),
    setCurrentSpace: (space) => dispatch({type:"SET_CURRENT_SPACE", space})
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(SpaceCard)

// <Card link>
//   <Card.Content header={this.props.space.name}/>
//   <Segment>
//   {this.renderContainerDescriptions()}
//   </Segment>
// </Card>

// <List>
//   {this.renderSpaceItems()}
// </List>