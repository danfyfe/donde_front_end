import React, { Component, } from 'react'
import { Segment, Header, Form, Dropdown, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'

import Search from './Search.js'


class ItemPage extends Component {

  state = {
    editing: false,
    itemName: "",
    itemDescription: "",
    itemHousehold_id: "",
    itemSpace_id: "",
    itemContainer_id: "",
    addingOwners: false,
    addOwnersIds: []
  }

  componentDidMount(){
    fetch('http://localhost:3000/api/v1/profile',{
      method:"POST",
      headers: { Authorization:  localStorage.getItem("token") }
    }).then(resp=>resp.json())
    .then(user=>{
      // console.log("USER", user)
      this.props.setUser(user.user)
    })
    .then(
      fetch(`http://localhost:3000/api/v1/items/${this.props.match.params.id}`,{
        method: "GET",
        headers: { Authorization:  localStorage.getItem("token") }
      })
      .then(resp=>resp.json())
      .then(item=>{
        // console.log(item)
        this.setState({
          itemName: item.name,
          itemDescription: item.description,
          itemContainer_id: item.container.id,
          itemSpace_id: item.space.id,
          itemHousehold_id: item.household.id
        })
        this.props.setCurrentItem(item)
      })
    )
  }


  renderOwners = () => {
    if (this.props.state.currentItem.users) {
      return this.props.state.currentItem.users.map(user => {
        return <Segment key={user.id}>{user.username}</Segment>
      })
    }
  }

  renderLocationDetails = () => {
    if (this.props.state.currentItem.household) {
      return <>
      <Header as="h1">{this.props.state.currentItem.household.name}</Header>
      <Header as="h4">{this.props.state.currentItem.space.name}</Header>
      <Header as="h5">{this.props.state.currentItem.container.name}</Header>
      </>
    }
  }

  handleItemNameInput = (e) => {
    this.setState({
      // [e.target.name]: e.target.value
      itemName: e.target.value
    })
  }

  handleItemDescriptionInput = (e) => {
    this.setState({
      itemDescription: e.target.value
    })
  }

  handleHouseholdInput = (e,data) => {
    this.setState({
      itemHousehold_id: data.value
    })
  }

  handleSpaceInput = (e,data) => {
    this.setState({
      itemSpace_id: data.value
    })
  }

  handleContainerInput = (e,data) => {
    this.setState({
      itemContainer_id: data.value
    })
  }

  setEditing = () => {
    this.setState({
      editing: !this.state.editing
    })
  }

  renderEditHeader = () => {
    return <Header onClick={this.setEditing} color="blue">Edit Item</Header>
  }



  renderEditForm = () => {
    if (this.props.state.user.households) {
      const householdOptions = this.props.state.user.households.map(household => {
        return {key:household.id, text:household.name, value:household.id}
      })
      const userSpaces = this.props.state.user.households.map(household => {
        return household.spaces
      }).flat()

      const spaceOptions = userSpaces.map(space => {
        return {key:space.id, text:space.name, value:space.id}
      })

      const userContainers = userSpaces.map(space => {
        return space.containers
      }).flat()

      const containerOptions = userContainers.map(container => {
        return {key: container.id, text: container.name, value: container.id}
      })

    return <Segment clearing>
      <Form>
        <Form.Field>
          <label>Name</label>
          <input onChange={this.handleItemNameInput} placeholder="Item name" value={this.state.itemName}/>
        </Form.Field>

        <Form.Field>
          <label>Description</label>
          <input onChange={this.handleItemDescriptionInput} placeholder="Item description" value={this.state.itemDescription}/>
        </Form.Field>

        <Form.Field>
          <label>Container</label>
          <Dropdown name="container_id" onChange={this.handleContainerInput} pointing="top left" placeholder="Select Container" fluid selection options={containerOptions}/>
        </Form.Field>

        <Form.Field>
          <label>Space</label>
          <Dropdown name="space_id" onChange={this.handleSpaceInput} pointing="top left" placeholder="Select Space" fluid selection options={spaceOptions}/>
        </Form.Field>

        <Form.Field>
          <label>Household</label>
          <Dropdown name="household_id" onChange={this.handleHouseholdInput} pointing="top left" placeholder="Select Household" fluid selection options={householdOptions}/>
        </Form.Field>

        <Button onClick={this.setEditing} floated="right">Cancel</Button>
        <Button onClick={this.editItem} floated="right">Submit</Button>

      </Form>
    </Segment>
    }
  }

  editItem = () => {
    fetch(`http://localhost:3000/api/v1/items/${this.props.state.currentItem.id}`,{
      method:"PATCH",
      headers:{
        'Content-Type':'application/json',
        Accept: 'application/json'
      },
      body:JSON.stringify({
        item:{
          household_id: this.state.itemHousehold_id,
          space_id: this.state.itemSpace_id,
          container_id: this.state.itemContainer_id,
          id: this.props.state.currentItem.id,
          name: this.state.itemName,
          description: this.state.itemDescription
        }
      })
    }).then(resp=>resp.json())
    .then(updatedItem => {
      // console.log("updated item",updatedItem)
      this.props.setCurrentItem(updatedItem)
    })
  }



  // add owners
    setAddingOwners = () => {
      this.setState({
        addingOwners: !this.state.addingOwners
      })
    }

    renderAddOwnersHeader = () => {
      return <Header color="blue">Add Owners</Header>
    }

    renderAddOwnersForm = () => {
      // console.log('addOwnersForm', this.props.state.currentItem.household)
      // console.log('addOwnersForm USER', this.props.state.user)
      let currentItemHousehold = {}

      if (this.props.state.user.households) {
        currentItemHousehold = this.props.state.user.households.filter(household => {
          return household.id === this.props.state.currentItem.household.id
        })[0]

      }

      let currentItemHouseholdUsersOptions = {}

      if (currentItemHousehold.users) {
         currentItemHouseholdUsersOptions = currentItemHousehold.users.map(user => {
          return {key:user.id,text:user.username,value:user.id}
        })
      }

      // console.log(currentItemHouseholdUsersOptions)
      // debugger
      if (currentItemHouseholdUsersOptions.hasOwnProperty(0)) {
        return <Segment clearing>
          <Form>
            <Form.Field>
              <Dropdown
              onChange = {this.handleOwnersInput}
              placeholder='Household Users'
              fluid
              multiple
              search
              selection
              options={currentItemHouseholdUsersOptions}
              />
            </Form.Field>
            <Button onClick={this.setAddingOwners} floated="right">Cancel</Button>
            <Button onClick={this.addOwners} floated="right">Submit</Button>
          </Form>
        </Segment>



      }

    }

    handleOwnersInput = (e,data) => {
      // console.log(data.value)
      this.setState({
        addingOwnersIds: data.value
      })
    }


    addOwners = () => {
      fetch(`http://localhost:3000/api/v1/items/owners/${this.props.state.currentItem}`,{
        method:"PATCH",
        headers:{
          'Content-Type':'application/json',
          Accept: 'application/json'
        },
        body:JSON.stringify({
          item:{
            id: this.props.state.currentItem.id
          },
          users: this.state.addingOwnersIds
        })
      }).then(resp=>resp.json())
      .then(item =>{
        // console.log(item)
        this.props.setCurrentItem(item)
      })
    }


  render(){
    // console.log(this.state)
    // console.log(this.props.state.currentItem.space.name)
    // console.log(this.props.state.currentItem.household)
    // console.log('item page state', this.state)
    // console.log('current_item', this.props.state.currentItem)
    // console.log('current_user', this.props.state.user.households)
    return(
        <>{this.props.state.searching ? <Search history={this.props.history}/> : null}
      <Segment.Group style={{margin:"2% auto",width:"98%"}}>
        <Segment>
        {this.state.editing ? this.renderEditForm() : this.renderEditHeader()}

          <Header>{this.props.state.currentItem.name}</Header>
        </Segment>
        <Segment.Group>
          <Segment>
            {this.renderLocationDetails()}
          </Segment>
        </Segment.Group>



        {this.renderAddOwnersHeader()}
        {this.renderAddOwnersForm()}

        <Segment>Owners:</Segment>
        <Segment.Group>
            {this.renderOwners()}
        </Segment.Group>

      </Segment.Group>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return { state }
}

const mapDispatchToProps = (dispatch) => {
    return {
      setUser: (user) => dispatch({type:"SET_USER", user}),
      setHouseholds: (households) => dispatch({type:"SET_HOUSEHOLDS", households}),
      addHousehold: (household) => dispatch({type:"ADD_HOUSEHOLD", household}),
      setUserHouseholdMessages: (allMessages) => dispatch({type:"SET_USERHOUSEHOLDMESSAGES", allMessages}),
      addMessage: (message) => dispatch({type:"ADD_MESSAGE", message}),
      setCurrentItem: (item) => dispatch({type:"SET_CURRENT_ITEM", item})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ItemPage)