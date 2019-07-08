import React, { Component, } from 'react'
import { Segment, Header, Form, Dropdown, Button, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'

import Search from './Search.js'
import Loading from './Loading.js'


class ItemPage extends Component {

  state = {
    editing: false,
    itemName: "",
    itemDescription: "",
    itemHousehold_id: "",
    itemSpace_id: "",
    itemContainer_id: "",
    addingOwners: false,
    addOwnersIds: [],
    deleting: false,
    statusMessage: "",
    error: false
  }

  componentDidMount(){
    this.props.isFetching()
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
        // console.log(this.props.state.currentItem)
        if (this.props.state.currentItem) {
          this.props.isDoneFetching()

        }
      })
    )
  }


  renderOwners = () => {
    if (this.props.state.currentItem.users) {
      if (this.props.state.currentItem.users.length === 0) {
        return <Message>This item currently has no owners! Click Add Owners to give it some!</Message>
      } else {
        return this.props.state.currentItem.users.map(user => {
          return <Segment key={user.id}>{user.username}</Segment>
        })
      }
    }
  }

  renderDescription = () => {
    if (this.props.state.currentItem) {
      return <Header>{this.props.state.currentItem.description}</Header>
    }
  }

  renderLocationDetails = () => {
    if (this.props.state.currentItem.household) {
      return <>
      <Header as="h4" floated="left" color="grey">in {this.props.state.currentItem.container.name}</Header>
      <Header as="h4" floated="left" color="grey">in {this.props.state.currentItem.space.name}</Header>
      <Header as="h4" floated="left" color="grey">at {this.props.state.currentItem.household.name}</Header>
      </>
    }
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
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

  setDeleting = () => {
    this.setState({
      deleting: !this.state.deleting,
      statusMessage: ""
    })
  }

  renderEditHeader = () => {
    return <>
    <Button floated="right" size="mini" onClick={this.setEditing} color="blue">Move Item</Button>
    </>
  }

  renderDeleteHeader = () => {
    return <>
      <Button floated="right" size="mini" onClick={this.setDeleting} color="red">Delete Item</Button>
    </>
  }

  renderDeleteForm = () => {
    return <Segment clearing>
      {this.renderErrorMessage()}
      <Form>
        <Form.Field>
          <label>Please enter household password to delete item</label>
          <input onChange={this.handleInput} name="householdPassword" type="password" placeholder="Household password"/>
        </Form.Field>
        <Button floated="right" size="mini" onClick={this.setDeleting}>Cancel</Button>
        <Button floated="right" size="mini" color="red" onClick={this.deleteItem}>Delete Item</Button>
      </Form>
    </Segment>
  }

  renderEditForm = () => {
    if (this.props.state.user.households) {
      // const householdOptions = this.props.state.user.households.map(household => {
      //   return {key:household.id, text:household.name, value:household.id}
      // })

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
        console.log(container)
        return {key: container.id, text: `${container.name}`, value: container.id}
      })

    return <Segment clearing raised>
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



        <Button onClick={this.setEditing} floated="right" size="mini">Cancel</Button>
        <Button onClick={this.editItem} floated="right" size="mini">Submit</Button>

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
        },
        user_id: this.props.state.user.id
      })
    }).then(resp=>resp.json())
    .then(updatedItem => {
      // console.log("updated item",updatedItem)
      this.props.setCurrentItem(updatedItem)
      this.setState({
        editing: !this.state.editing
      })
    })
  }

  deleteItem = () => {
    fetch(`http://localhost:3000/api/v1/items/${this.props.state.currentItem.id}`,{
      method:"DELETE",
      headers:{
        'Content-Type':'application/json',
        Accept: 'application/json'
      },
      body:JSON.stringify({
        householdPassword: this.state.householdPassword,
        userId: this.props.state.user.id
      })
    }).then(resp=>resp.json())
    .then(data => {

      // console.log(data)

      this.setState({
        statusMessage: data.message
      })

      if (!data.error) {
        if (this.props.state.currentHousehold.hasOwnProperty('id')) {
          this.props.history.push(`/households/${this.props.state.currentHousehold.id}`)
          this.props.setCurrentContainer({})
          this.props.setCurrentSpace({})
          this.props.setCurrentHousehold(this.props.state.currentHousehold)
        } else {
          this.props.history.push('/')
        }
      }


    })
  }


  // add owners
    setAddingOwners = () => {
      this.setState({
        addingOwners: !this.state.addingOwners
      })
    }

    renderAddOwnersHeader = () => {
      return <Button floated="right" size="mini" onClick={this.setAddingOwners} color="blue">Add Owners</Button>
    }

    renderAddOwnersForm = () => {
      // console.log('addOwnersForm', this.props.state.currentItem.household)
      // console.log('addOwnersForm USER', this.props.state.user)
      let currentItemHousehold = {}

      if (this.props.state.user.households && this.props.state.currentItem.household) {
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
        return <Segment clearing raised>
          <Form>
            <Form.Field>
            <label>Owners to be added</label>
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
            <Button onClick={this.setAddingOwners} floated="right" size="mini">Cancel</Button>
            <Button onClick={this.addOwners} floated="right" size="mini">Submit</Button>
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
      this.props.isFetching()
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
          users_ids: this.state.addingOwnersIds
        })
      }).then(resp=>resp.json())
      .then(item =>{
        // console.log(item)
        this.props.setCurrentItem(item)

        this.setState({
          addingOwners: !this.state.addingOwners
        })

        if (this.props.state.currentItem) {
          this.props.isDoneFetching()
        }

      })
    }

    renderErrorMessage = () => {
      if (this.state.statusMessage !== "") {
        return <Message warning>{this.state.statusMessage}</Message>
      }
    }


  render(){
    // console.log('done?',this.props.state.isDoneFetching)
    // console.log('started', this.props.state.isFetching)
    console.log(this.props.state.currentHousehold)
    return(
      <>
      {this.props.state.isDoneFetching ?
        <>{this.props.state.searching ? <Search history={this.props.history}/> : null}

      <Segment clearing style={{margin:"1% auto",width:"98%"}}>

      <Segment clearing>
        <Header floated="left" as="h1">{this.props.state.currentItem.name}</Header>

        {/*this.renderLocationDetails()*/}

        {this.state.deleting ? this.renderDeleteForm() : this.state.editing ? null :this.renderDeleteHeader()}

        {this.state.editing ? this.renderEditForm() : this.state.deleting ? null :this.renderEditHeader()}

      </Segment>

      <Segment.Group>
        <Segment clearing>
          {this.renderLocationDetails()}
        </Segment>
        <Segment>
          {this.renderDescription()}
        </Segment>
      </Segment.Group>


        <Segment clearing>
          <Header floated="left">Owners</Header>
          {this.state.addingOwners ? this.renderAddOwnersForm() : this.renderAddOwnersHeader() }
          <Segment.Group style={{margin:"2.5% 0 0 0"}}>
            {this.renderOwners()}
          </Segment.Group>
        </Segment>

      </Segment>

        </> : <Loading/>

      }
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
      setCurrentItem: (item) => dispatch({type:"SET_CURRENT_ITEM", item}),
      isFetching: () => dispatch({type:"IS_FETCHING"}),
      isDoneFetching: () => dispatch({type:"IS_DONE_FETCHING"}),
      setCurrentSpace: (space) => dispatch({type:"SET_CURRENT_SPACE"}),
      setCurrentContainer: (container) => dispatch({type:"SET_CURRENT_CONTAINER", container}),
      setCurrentHousehold: (household) => dispatch({type:"SET_CURRENT_HOUSEHOLD", household})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ItemPage)

// <Form.Field>
//   <label>Household</label>
//   <Dropdown name="household_id" onChange={this.handleHouseholdInput} pointing="top left" placeholder="Select Household" fluid selection options={householdOptions}/>
// </Form.Field>