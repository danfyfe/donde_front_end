import React, { Component } from 'react'
import { Segment, Header, Menu, Card, List, Icon } from 'semantic-ui-react'

class SpaceCard extends Component {

  renderContainerDescriptions = () => {
      return this.props.space.containers.map(container => {
        return <>
        <Segment>
            <Card.Content  header={container.name}/>
            <Card.Content meta={container.description}/>

            <Card.Content extra>
            <List>
              {this.renderSpaceItems()}
            </List>
          </Card.Content>
        </Segment>
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

      <Card link>
        <Card.Content header={this.props.space.name}/>
        <Segment>
        {this.renderContainerDescriptions()}
        </Segment>
      </Card>
    )
  }
}

export default SpaceCard