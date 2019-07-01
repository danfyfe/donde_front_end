import React, { Component, } from 'react'
import { Card, Button } from 'semantic-ui-react'

class ItemCard extends Component {
  state = {
    editingItem: false
  }

  renderOwners = () => {
    return this.props.item.users.map(user => {
      return <span>{user.username}</span>
    })
  }

  render(){
    // console.log(this.props.item)
    return(
      <Card link>
        <Card.Content header={this.props.item.name}/>
        <Card.Content meta={this.props.item.container.name}/>
        <Card.Content description={this.props.item.description}/>
        <Card.Content extra>
          Owners: {this.renderOwners()}
        </Card.Content>
        <Button size="mini">Edit</Button>
      </Card>
    )
  }
}
export default ItemCard