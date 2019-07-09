import React, { Component } from 'react'
import { Segment, Header, Form, Button, Message, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux'

import ItemCard from './ItemCard.js'


class Container extends Component {

  state = {
    addingItem: false,
    addingOwnersIds: []
  }

  renderItemCards = () => {
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

  handleOwnersInput = (e,data) => {
    // console.log(data.value)
    this.setState({
      addingOwnersIds: data.value
    })
  }

  setAddItem = () => {
    this.setState({
      addingItem: !this.state.addingItem
    })
  }

  redirectToItemPage = (item) => {
    this.props.history.push(`/items/${item.id}`)
    this.props.setCurrentItem(item)
  }

  renderAddItemHeader = () => {
    return <>
    <Button onClick={() => this.props.setCurrentContainer({})} color="blue" size="mini" floated="right">Back to Space</Button>
    <Button onClick={this.setAddItem} color="blue" size="mini" floated="right">Add Item</Button>
    </>
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
        },
        users_ids: this.state.addingOwnersIds
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

    let currentHosueholdUsersOptions = {}

    if (this.props.state.currentHousehold.users) {
      currentHosueholdUsersOptions = this.props.state.currentHousehold.users.map(user => {
        return {key:user.id,text:user.username,value:user.id}
      })
    }

    return <Segment clearing raised>
    <Message header={"Add an Item to" + this.props.state.currentContainer.name} size="mini"/>
      <Form>
        <Form.Field>
          <label>Name</label>
          <input onChange={this.handleInput} name="itemName" placeholder="Item name"/>
        </Form.Field>

        <Form.Field>
          <label>Description</label>
          <input onChange={this.handleInput} name="itemDescription" placeholder="Item description"/>
        </Form.Field>

        <Form.Field>
        <label>Owners</label>
          <Dropdown
          onChange = {this.handleOwnersInput}
          placeholder='Household Users'
          fluid
          multiple
          search
          selection
          options={currentHosueholdUsersOptions}
          />
        </Form.Field>



        <Button onClick={this.setAddItem} floated="right" size="mini">Cancel</Button>
        <Button onClick={this.addItem} floated="right" size="mini">Submit</Button>
      </Form>
    </Segment>
  }


  render(){
    // console.log(this.props.history)
    console.log(this.state)
    return(
      <>
      <Segment clearing>
          <>
          <Header floated="left">{this.props.container.name}</Header>
          <Header color="grey" floated="left">in {this.props.state.currentSpace.name} at {this.props.state.currentHousehold.name}</Header>
          {this.state.addingItem ? this.renderAddItemForm() : this.renderAddItemHeader()}

          {this.renderItemCards()}
          </>

      </Segment>
      </>
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
    addItem: (item) => dispatch({type:"ADD_ITEM", item}),
    setCurrentContainer: (container) =>
      dispatch({type:"SET_CURRENT_CONTAINER", container}),
    setCurrentItem: (item) => dispatch({type:"SET_CURRENT_ITEM", item})
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Container)