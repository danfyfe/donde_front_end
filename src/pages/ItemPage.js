import React, { Component } from 'react'
import { Segment, Header, Form, Dropdown, Button, Message, Menu, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import apiEndpoint from '../actions/ApiEndpoint.js'
import { getUser } from '../actions/userActions.js'
import { getItem } from '../actions/itemActions.js'

import Search from '../components/Search.js'
import Loading from '../components/Loading.js'
import ItemLocationDetails from '../containers/ItemLocationDetails.js'
import ItemDescription from '../containers/ItemDescription'
import EditItemForm from '../components/forms/items/EditItemForm.js'
import AddOwnersForm from '../components/forms/items/AddOwnersForm.js'

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
    const { id } = this.props.match.params

    this.props.setUser();

    this.props.setItem(id);


  }


  renderOwners = () => {
    if (this.props.item.users) {
      if (this.props.item.users.length === 0) {
        return <Message>This item currently has no owners! Click Add Owners to give it some!</Message>
      } else {
        return this.props.item.users.map(user => {
          return <Segment key={user.id}>
            <div className='d-flex justify-content-between'>
              <span className='font-weight-bold'>{user.username}</span>

              <Icon link color="red" floated='right' name='cancel' onClick={()=>this.removeOwner(user.id)}/>
            </div>
          </Segment>
        })
      }
    }
  }

  renderDescription = () => {
    if (this.props.item) {
      return <Header>{this.props.item.description}</Header>
    }
  }

  // renderLocationDetails = () => {
  //   if (this.props.item.household && this.props.item.container && this.props.item.space) {
  //     return <>
  //     <Header as="h4" floated="left" color="grey">in {this.props.item.container.name}</Header>
  //     <Header as="h4" floated="left" color="grey">in {this.props.item.space.name}</Header>
  //     <Header as="h4" floated="left" color="grey">at {this.props.item.household.name}</Header>
  //     </>
  //   }
  // }

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

  setEditing = () => {
    this.setState({
      editing: !this.state.editing
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
    if (this.props.user.households && this.props.item) {

      const itemHousehold = this.props.user.households.filter(household => {
        return household.id === this.props.item.household.id
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

    return <Segment clearing raised className='full-width'>
      <Form>

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
    fetch(`${apiEndpoint}/items/${this.props.item.id}`,{
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
          id: this.props.item.id,
          name: this.state.itemName,
          description: this.state.itemDescription
        },
        user_id: this.props.user.id
      })
    }).then(resp=>resp.json())
    .then(updatedItem => {
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
    fetch(`${apiEndpoint}/items/${this.props.item.id}`,{
      method:"DELETE",
      headers:{
        'Content-Type':'application/json',
        Accept: 'application/json',
        Authorization:  localStorage.getItem("token")
      },
      body:JSON.stringify({
        householdPassword: this.state.householdPassword,
        userId: this.props.user.id
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
      return <>
      <span className='font-weight-bold big-font'>Owners</span>
      <Button floated="right" size="mini" onClick={this.setAddingOwners} color="blue">Add Owners</Button>
      </>
    }

    // renderAddOwnersForm = () => {
    //
    //   let currentItemHousehold = {}
    //
    //   if (this.props.user.households && this.props.item.household) {
    //     currentItemHousehold = this.props.user.households.filter(household => {
    //       return household.id === this.props.item.household.id
    //     })[0]
    //
    //   }
    //
    //   let currentItemHouseholdUsersOptions = {}
    //
    //   if (currentItemHousehold.users) {
    //      currentItemHouseholdUsersOptions = currentItemHousehold.users.map(user => {
    //       return {key:user.id,text:user.username,value:user.id}
    //     })
    //   }
    //
    //   if (currentItemHouseholdUsersOptions.hasOwnProperty(0)) {
    //     return <Segment clearing raised className='full-width'>
    //       <Form>
    //         <Form.Field>
    //         <label>Owners to be added</label>
    //           <Dropdown
    //           onChange = {this.handleOwnersInput}
    //           placeholder='Household Users'
    //           fluid
    //           multiple
    //           search
    //           selection
    //           options={currentItemHouseholdUsersOptions}
    //           />
    //         </Form.Field>
    //         <Button onClick={this.setAddingOwners} floated="right" size="mini">Cancel</Button>
    //         <Button onClick={this.addOwners} floated="right" size="mini">Submit</Button>
    //       </Form>
    //     </Segment>
    //   }
    // }

    // handleOwnersInput = (e,data) => {
    //   this.setState({
    //     addingOwnersIds: data.value
    //   })
    // }
    //
    // addOwners = () => {
    //   this.props.isFetching()
    //   fetch(`${apiEndpoint}/items/owners/${this.props.item.id}`,{
    //     method:"PATCH",
    //     headers:{
    //       'Content-Type':'application/json',
    //       Accept: 'application/json',
    //       Authorization:  localStorage.getItem("token")
    //     },
    //     body:JSON.stringify({
    //       item:{
    //         id: this.props.item.id
    //       },
    //       users_ids: this.state.addingOwnersIds
    //     })
    //   }).then(resp=>resp.json())
    //   .then(item =>{
    //
    //     this.props.setCurrentItem(item)
    //
    //     this.setState({
    //       addingOwners: !this.state.addingOwners
    //     })
    //
    //     if (this.props.item) {
    //       this.setState({
    //         statusMessage: "Owners succesfully added!"
    //       })
    //       this.props.isDoneFetching()
    //     }
    //
    //   })
    // }

    // removeOwner = (userId) => {
    //   this.props.isFetching()
    //   fetch(`${apiEndpoint}/items/owners/${this.props.item.id}/${userId}`,{
    //     method:"DELETE",
    //     headers:{
    //       'Content-Type':'application/json',
    //       Accept: 'application/json',
    //       Authorization:  localStorage.getItem("token"),
    //       Allow: 'DELETE'
    //     },
    //     body:JSON.stringify({
    //       item:{
    //         id: this.props.item.id
    //       },
    //       user_id: userId
    //     })
    //   }).then(resp=>resp.json())
    //   .then(item =>{
    //
    //     this.props.setCurrentItem(item)
    //
    //     if (this.props.item) {
    //       this.setState({
    //         statusMessage: "Owners succesfully removed!"
    //       })
    //       this.props.isDoneFetching()
    //     }
    //
    //   })
    // }

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
      if (this.props.item) {
        this.props.setCurrentSpace({})
        this.props.setCurrentContainer({})
        this.props.history.push(`/households/${this.props.item.household.id}`)
      }
    }

    componentWillUnmount(){
      clearInterval(this.messageTimer)
    }

  render(){

    const { user, searching, item } = this.props

    return(
      <>
      {/*this.setStatusMessageToNothing()*/}
      {item.hasOwnProperty('id') ?
        <>{searching ? <Search history={this.props.history}/> : null}

      <Menu style={{marginTop: "0px"}}>
        <Header style={{padding:"10px"}}>Welcome,  {user.username}!</Header>
      </Menu>

      <Segment clearing raised style={{width:"300px", height:'150px', margin:'auto', minHeight:"500px", backgroundColor:"#f7f7f7"}}>
        {this.state.statusMessage !== "" ? this.renderStatusMessage() : null}

        <div className='d-flex justify-content-between'>
          <span className='font-weight-bold huge-font'>{item.name}</span>
          <span className='my-auto ml-auto link' onClick={this.setEditing}>Edit</span>
        </div>

        <div className='d-flex flex-column'>
          <ItemLocationDetails
            item={item} />
          <ItemDescription itemDescription={item.description} />
        </div>

        { this.state.editing ? <EditItemForm setEditing={this.setEditing} item={item}/> : null }

        <Segment clearing>
          <div className='d-flex flex-column'>
          <div className='d-flex justify-content-between'>
            {this.state.addingOwners ? <AddOwnersForm setAddingOwners={this.setAddingOwners} /> : this.renderAddOwnersHeader() }
          </div>
          <Segment.Group style={{margin:"4% 0 0 0"}}>
            {this.renderOwners()}
          </Segment.Group>
          </div>
        </Segment>
        <div className='d-flex justify-content-around'>
        {this.state.deleting ? this.renderDeleteForm() : this.state.moving ? null :this.renderDeleteHeader()}

        {this.state.moving ? this.renderMovingForm() : this.state.deleting ? null :this.renderMovingHeader()}
        </div>
      </Segment>

        </> : <Loading/>

      }
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    item: state.item,
    user: state.user,
    searching: state.app.searching
   }
}

const mapDispatchToProps = dispatch => {
    return {
      setUser: () => dispatch(getUser()),
      setItem: (itemId) => dispatch(getItem(itemId)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ItemPage)

// <Button floated="right" color="blue" size="mini" style={{}} onClick={this.redirectToHousehold}>Return to Household</Button>