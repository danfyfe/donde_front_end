import React, { Component } from 'react'
import { Segment, Card, List, Icon, Header, Menu, Form, Button, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'

import ItemCard from './ItemCard.js'


class Container extends Component {

  state = {
    addingItem: false
  }

  renderItemCards = () => {
    console.log()
    if (this.props.container.items) {
      return this.props.container.items.map(item => {
        return <ItemCard redirectToItemPage={this.redirectToItemPage} item={item}/>
      })
    }
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  setAddItem = () => {
    this.setState({
      addingItem: !this.state.addingItem
    })
  }

  redirectToItemPage = (id) => {
    this.props.history.push(`/items/${id}`)
  }

  renderAddItemHeader = () => {
    return <Header onClick={this.setAddItem} color="blue">Add Item</Header>
  }

  addItemToCurrentContainer = () => {

  }

  addItem = () => {
    fetch('http://localhost:3000/api/v1/items',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
        Accept: 'application/json'
      },
      body:JSON.stringify({
        item:{
          name: this.state.itemName,
          description: this.state.itemDescription,
          container_id: this.props.state.currentContainer.id
        }
      })
    }).then(resp=>resp.json())
    .then(item =>{
      // console.log('new item', item)
      this.props.addItem(item)
      this.setState({
        addingItem: !this.state.addingItem
      })
    })
  }

  renderAddItemForm = () => {
    return <Segment clearing>
    <Message>Add an Item to this Container</Message>
      <Form>
        <Form.Field>
          <label>Name</label>
          <input onChange={this.handleInput} name="itemName" placeholder="Item name"/>
        </Form.Field>

        <Form.Field>
          <label>Description</label>
          <input onChange={this.handleInput} name="itemDescription" placeholder="Item description"/>
        </Form.Field>

        <Button onClick={this.setAddItem} floated="right">Cancel</Button>
        <Button onClick={this.addItem} floated="right">Submit</Button>
      </Form>
    </Segment>
  }


  render(){
    // console.log(this.props.history)
    return(
      <Segment>

          <Header size="medium">{this.props.container.name}</Header>
          {this.state.addingItem ? this.renderAddItemForm() : this.renderAddItemHeader()}

          <Card.Group>
            {this.renderItemCards()}
          </Card.Group>

      </Segment>
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
    setCurrentSpace: (space) => dispatch({type:"SET_CURRENT_SPACE"}),
    addItem: (item) => dispatch({type:"ADD_ITEM", item})
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Container)