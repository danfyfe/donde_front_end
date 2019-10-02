import React, { Component } from 'react'
import { Segment, Header, Button, Message, Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getUser } from '../actions/userActions.js'
import { getItem } from '../actions/itemActions.js'

import Search from '../components/Search.js'
import Loading from '../components/Loading.js'
import ItemLocationDetails from '../containers/ItemLocationDetails.js'
import ItemDescription from '../containers/ItemDescription'
import ItemOwnersContainer from '../containers/ItemOwnersContainer'
import EditItemForm from '../components/forms/items/EditItemForm.js'
import AddOwnersForm from '../components/forms/items/AddOwnersForm.js'
import DeleteItemForm from '../components/forms/items/DeleteItemForm.js'
import MoveItemForm from '../components/forms/items/MoveItemForm.js'


class ItemPage extends Component {

  state = {
    editing: false,
    moving: false,
    addingOwners: false,
    deleting: false,
    statusMessage: "",
    error: false
  }

  componentDidMount(){
    const { id } = this.props.match.params

    this.props.setUser();

    this.props.setItem(id);

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

  renderMovingButton = () => {
    return <>
    <Button floated="right" size="mini" onClick={this.setMoving} color="blue" style={{margin:"7% .05% 0 0"}}>Move Item</Button>
    </>
  }

  renderDeleteButton = () => {
    return <>
      <Button floated="right" size="mini" onClick={this.setDeleting} color="red" style={{margin:"7% 0 0 0"}}>Delete Item</Button>
    </>
  }

  renderErrorMessage = () => {
    return <Message key={1} error header={this.state.statusMessage}/>
  }


  setAddingOwners = () => {
    this.setState({
      addingOwners: !this.state.addingOwners
    })
  }

  renderAddOwnersButton = () => {
    return <>
    <span className='font-weight-bold big-font'>Owners</span>
    <Button floated="right" size="mini" onClick={this.setAddingOwners} color="blue">Add Owners</Button>
    </>
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
    if (this.props.item) {
      this.props.setCurrentSpace({})
      this.props.setCurrentContainer({})
      this.props.history.push(`/households/${this.props.item.household.id}`)
    }
  }

  renderBackToHousehold = () => {
    return <Button className='' size='mini'
    onClick={this.redirectToHousehold}>Back to Household</Button>
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

        <div className='d-flex justify-content-around'>
          {this.state.deleting ? <DeleteItemForm setDeleting={this.setDeleting}/> : this.state.moving ? null :this.renderDeleteButton()}
          {this.state.moving ? <MoveItemForm setMoving={this.setMoving}/> : this.state.deleting ? null :this.renderMovingButton()}
        </div>

        <Segment clearing>
          <div className='d-flex flex-column'>
          <div className='d-flex justify-content-between'>
            {this.state.addingOwners ? <AddOwnersForm setAddingOwners={this.setAddingOwners} /> : this.renderAddOwnersButton() }
          </div>
          <Segment.Group style={{margin:"4% 0 0 0"}}>
            <ItemOwnersContainer />
          </Segment.Group>
          </div>
        </Segment>
        <div className='d-flex justify-content-center med-padding'>
        {this.renderBackToHousehold()}
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
      setCurrentSpace: (space) => dispatch({type:"SET_CURRENT_SPACE"}),
      setCurrentContainer: container => {
        dispatch({type:"SET_CURRENT_CONTAINER", container})
      }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ItemPage)