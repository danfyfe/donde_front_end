import React, { Component } from 'react'
import { Segment, Header, Form, Dropdown, Button, Message, Menu, Icon, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'

import Search from '../components/Search.js'
import Loading from '../components/Loading.js'



class ItemPage extends Component {

  state = {
    editing: false,
    moving: false,
    itemName: "",
    itemDescription: "",
    itemHousehold_id: "",
    itemSpace_id: "",
    itemContainer_id: "",
    itemContainerName:"",
    itemSpaceName:"",
    addingOwners: false,
    addOwnersIds: [],
    deleting: false,
    statusMessage: "",
    error: false
  }

  componentDidMount(){
    this.props.isFetching()
    fetch('https://df-donde-api.herokuapp.com/api/v1/profile',{
      method:"POST",
      headers: { Authorization:  localStorage.getItem("token") }
    }).then(resp=>resp.json())
    .then(user=>{
      // console.log("USER", user)
      this.props.setUser(user.user)
    })
    .then(
      fetch(`https://df-donde-api.herokuapp.com/api/v1/items/${this.props.match.params.id}`,{
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
          itemHousehold_id: item.household.id,
          itemContainerName: item.container.name,
          itemSpaceName: item.space.name
        })

        this.props.setCurrentItem(item)
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
          return <Segment clearing key={user.id}>
          <Grid>
            <Grid.Column floated="left" >
              <Header as="h3">{user.username}</Header>
            </Grid.Column>
            <Grid.Column>
              <Icon link color="red" floated='right' name='cancel' onClick={()=>this.removeOwner(user.id)}/>
            </Grid.Column>
          </Grid>
          </Segment>
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
    if (this.props.state.currentItem.household && this.props.state.currentItem.container && this.props.state.currentItem.space) {
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

  setMoving = () => {
    this.setState({
      moving: !this.state.moving
    })
  }

  setDeleting = () => {
    this.setState({
      deleting: !this.state.deleting,
      statusMessage: ""
    })
  }

  renderMovingHeader = () => {
    return <>
    <Button floated="right" size="mini" onClick={this.setMoving} color="blue" style={{margin:"7% .05% 0 0"}}>Move Item</Button>
    </>
  }

  renderDeleteHeader = () => {
    return <>
      <Button floated="right" size="mini" onClick={this.setDeleting} color="red" style={{margin:"7% 0 0 0"}}>Delete Item</Button>
    </>
  }

  renderDeleteForm = () => {
    return <Segment clearing>
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

  renderMovingForm = () => {
    if (this.props.state.user.households && this.props.state.currentItem) {

      const itemHousehold = this.props.state.user.households.filter(household => {
        return household.id === this.props.state.currentItem.household.id
      })[0]


      let spaceOptions = []
      let containerOptions = []

      if (itemHousehold.spaces && itemHousehold.containers) {
        spaceOptions = itemHousehold.spaces.map(space => {
          return {key:space.id, text:space.name, value: space.id}
        })

        containerOptions = itemHousehold.containers.map(container => {
          return {key: container.id, text: container.name, value: container.id}
        })
      }

    return <Segment clearing raised>
      <Form>
        {/*<Form.Field>
          <label>Name</label>
          <input onChange={this.handleItemNameInput} placeholder="Item name" value={this.state.itemName}/>
        </Form.Field>

        <Form.Field>
          <label>Description</label>
          <input onChange={this.handleItemDescriptionInput} placeholder="Item description" value={this.state.itemDescription}/>
        </Form.Field>*/}

        <Form.Field>
          <label>Container</label>
          <Dropdown name="container_id" onChange={this.handleContainerInput} pointing="top left" placeholder={this.state.itemContainerName} fluid selection options={containerOptions}/>
        </Form.Field>

        <Form.Field>
          <label>Space</label>
          <Dropdown name="space_id" onChange={this.handleSpaceInput} pointing="top left" placeholder={this.state.itemSpaceName} fluid selection options={spaceOptions}/>
        </Form.Field>



        <Button onClick={this.setMoving} floated="right" size="mini">Cancel</Button>
        <Button onClick={this.moveItem} floated="right" size="mini">Submit</Button>

      </Form>
    </Segment>
    }
  }

  moveItem = () => {
    fetch(`https://df-donde.herokuapp.com/api/v1/items/${this.props.state.currentItem.id}`,{
      method:"PATCH",
      headers:{
        'Content-Type':'application/json',
        Accept: 'application/json',
        Authorization:  localStorage.getItem("token")
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
        moving: !this.state.moving,
        statusMessage: "Item successfully moved! A message was sent to your household on your behalf."
      })
    })
  }

  renderErrorMessage = () => {
    return <Message key={1} error header={this.state.statusMessage}/>
  }

  deleteItem = () => {
    fetch(`https://df-donde.herokuapp.com/api/v1/items/${this.props.state.currentItem.id}`,{
      method:"DELETE",
      headers:{
        'Content-Type':'application/json',
        Accept: 'application/json',
        Authorization:  localStorage.getItem("token")
      },
      body:JSON.stringify({
        householdPassword: this.state.householdPassword,
        userId: this.props.state.user.id
      })
    }).then(resp=>resp.json())
    .then(data => {

      this.setState({
        statusMessage: data.message,
        deleting: !this.state.deleting
      })


      if (!data.error) {
        if (this.props.state.currentHousehold.hasOwnProperty('id')) {
          this.props.itemDeleteConfirmation()
          this.props.setCurrentContainer({})
          this.props.setCurrentSpace({})
          this.props.setCurrentHousehold(this.props.state.currentHousehold)
          this.props.history.push(`/households/${this.props.state.currentHousehold.id}`)
        } else {
          this.props.itemDeleteConfirmation()
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
      this.setState({
        addingOwnersIds: data.value
      })
    }

    addOwners = () => {
      this.props.isFetching()
      fetch(`https://df-donde.herokuapp.com/api/v1/items/owners/${this.props.state.currentItem.id}`,{
        method:"PATCH",
        headers:{
          'Content-Type':'application/json',
          Accept: 'application/json',
          Authorization:  localStorage.getItem("token")
        },
        body:JSON.stringify({
          item:{
            id: this.props.state.currentItem.id
          },
          users_ids: this.state.addingOwnersIds
        })
      }).then(resp=>resp.json())
      .then(item =>{

        this.props.setCurrentItem(item)

        this.setState({
          addingOwners: !this.state.addingOwners
        })

        if (this.props.state.currentItem) {
          this.setState({
            statusMessage: "Owners succesfully added!"
          })
          this.props.isDoneFetching()
        }

      })
    }

    removeOwner = (userId) => {
      this.props.isFetching()
      fetch(`https://df-donde.herokuapp.com/api/v1/items/owners/${this.props.state.currentItem.id}/${userId}`,{
        method:"DELETE",
        headers:{
          'Content-Type':'application/json',
          Accept: 'application/json',
          Authorization:  localStorage.getItem("token"),
          Allow: 'DELETE'
        },
        body:JSON.stringify({
          item:{
            id: this.props.state.currentItem.id
          },
          user_id: userId
        })
      }).then(resp=>resp.json())
      .then(item =>{
        // console.log(item)

        this.props.setCurrentItem(item)

        if (this.props.state.currentItem) {
          this.setState({
            statusMessage: "Owners succesfully removed!"
          })
          this.props.isDoneFetching()
        }

      })
    }

    renderStatusMessage = () => {
      if (this.state.statusMessage !== "") {
        return <Message floated="center" style={{textAlign:"center"}} warning>{this.state.statusMessage}</Message>
      }
    }

    setStatusMessageToNothing = () => {
      if (this.state.statusMessage !== "") {
        this.messageTimer = setTimeout(()=>{
          this.setState({
            statusMessage: ""
          })
        }, 5000)
      }
    }

    redirectToHousehold = () => {
      if (this.props.state.currentItem) {
        this.props.setCurrentSpace({})
        this.props.setCurrentContainer({})
        this.props.history.push(`/households/${this.props.state.currentItem.household.id}`)
      }
    }

    componentWillUnmount(){
      clearInterval(this.messageTimer)
    }

  render(){

    return(
      <>
      {this.setStatusMessageToNothing()}
      {this.props.state.isDoneFetching ?
        <>{this.props.state.searching ? <Search history={this.props.history}/> : null}

      <Menu style={{marginTop: "0px"}}>
        <Header style={{padding:"10px"}}>Welcome,  {this.props.state.user.username}!</Header>
      </Menu>

      <Segment clearing raised style={{margin:"1% auto",width:"98%", minHeight:"500px", backgroundColor:"#f7f7f7"}}>
        {this.state.statusMessage !== "" ? this.renderStatusMessage() : null}
        <Segment clearing>
          <Header floated="left" as="h1">{this.props.state.currentItem.name}</Header>
          <Button floated="right" color="blue" size="mini" style={{margin:".5% 0 0 0"}} onClick={this.redirectToHousehold}>Return to Household</Button>
        </Segment>

        <Segment.Group>
          <Segment clearing>
            {this.renderLocationDetails()}
          </Segment>
          <Segment >
            {this.renderDescription()}
          </Segment>
        </Segment.Group>


        <Segment clearing>
          <Header floated="left">Owners</Header>
          {this.state.addingOwners ? this.renderAddOwnersForm() : this.renderAddOwnersHeader() }
          <Segment.Group style={{margin:"4% 0 0 0"}}>
            {this.renderOwners()}
          </Segment.Group>
        </Segment>
        {this.state.deleting ? this.renderDeleteForm() : this.state.moving ? null :this.renderDeleteHeader()}

        {this.state.moving ? this.renderMovingForm() : this.state.deleting ? null :this.renderMovingHeader()}

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
      setCurrentHousehold: (household) => dispatch({type:"SET_CURRENT_HOUSEHOLD", household}),
      itemDeleteConfirmation: () => dispatch({type:"ITEM_DELETE_CONFIRMATION"})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ItemPage)