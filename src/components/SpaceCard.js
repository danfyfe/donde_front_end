import React, { Component } from 'react'
import { Segment, Card, List, Icon } from 'semantic-ui-react'

class SpaceCard extends Component {

  renderContainerDescriptions = () => {
      return this.props.space.containers.map(container => {
        return <>
        <Card>
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
      <List.Content><Icon name='info'/>{item.name}</List.Content>
      </List.Item>
      </Segment>
    })
  }

  render(){
    console.log("SPACECARD",this.props.space)
    return(

      <Card link onClick={()=>{this.props.redirectToSpace(this.props.space.id)}}>
        <Card.Content header={this.props.space.name}/>

        {this.renderContainerDescriptions()}

      </Card>
    )
  }
}

export default SpaceCard

// <Card link>
//   <Card.Content header={this.props.space.name}/>
//   <Segment>
//   {this.renderContainerDescriptions()}
//   </Segment>
// </Card>

// <List>
//   {this.renderSpaceItems()}
// </List>