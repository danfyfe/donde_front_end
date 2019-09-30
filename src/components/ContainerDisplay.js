import React, { Component } from 'react'
import { Segment, Form, Button, Message, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux'

import ItemCard from './ItemCard.js'
import EditContainerForm from './forms/containers/EditContainerForm.js'
import DeleteContainerForm from './forms/containers/DeleteContainerForm.js'
import AddItemForm from './forms/items/AddItemForm.js'

let API_ENDPOINT
if (process.env.NODE_ENV === 'production') {
  API_ENDPOINT = 'https://df-donde-api.herokuapp.com'
} else {
  API_ENDPOINT = 'http://localhost:3000'
}

class Container extends Component {

  state = {
    addingItem: false,
    addingOwnersIds: [],
    deletingContainer: false,
    editingContainer: false,
    householdPassword: "",
    errorMessage: ""
  }

  renderItemCards = () => {
    if (this.props.container.items) {
      if (this.props.container.items.length === 0) {
        return <Message warning style={{margin:"4% 0 0 0", textAlign:"center"}}>There are currently no items in this container. Click Add Item to add one!</Message>
      } else {
        return this.props.container.items.map(item => {
          return <ItemCard key={item.id} redirectToItemPage={this.redirectToItemPage} item={item}/>
        })
      }
    }
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleOwnersInput = (e,data) => {
    this.setState({
      addingOwnersIds: data.value
    })
  }

  setAddingItem = () => {
    this.setState({
      addingItem: !this.state.addingItem
    })
  }

  redirectToItemPage = (item) => {
    this.props.history.push(`/items/${item.id}`)
    this.props.setCurrentItem(item)
  }

  // renderAddItemHeader = () => {
  //   return <>
  //   <Button onClick={() => this.props.setCurrentContainer({})} color="blue" size="mini" floated="right">Back to Space</Button>
  //   <Button onClick={this.setAddItem} color="blue" size="mini" floated="right">Add Item</Button>
  //   </>
  // }


  // addItem = () => {
  //   fetch(`${API_ENDPOINT}/api/v1/items`,{
  //     method:"POST",
  //     headers:{
  //       'Content-Type':'application/json',
  //       Accept: 'application/json'
  //     },
  //     body:JSON.stringify({
  //       item:{
  //         name: this.state.itemName,
  //         description: this.state.itemDescription,
  //         container_id: this.props.state.currentContainer.id
  //       },
  //       users_ids: this.state.addingOwnersIds
  //     })
  //   }).then(resp=>resp.json())
  //   .then(item =>{
  //     // console.log('new item', item)
  //     this.props.addItem(item)
  //     this.setState({
  //       addingItem: !this.state.addingItem
  //     })
  //   })
  // }

  // renderAddItemForm = () => {
  //
  //   let currentHosueholdUsersOptions = {}
  //
  //   if (this.props.household.users) {
  //     currentHosueholdUsersOptions = this.props.household.users.map(user => {
  //       return {key:user.id,text:user.username,value:user.id}
  //     })
  //   }
  //
  //   return <Segment clearing raised style={{marginTop:"2%"}}>
  //   <Message header={"Add an Item to " + this.props.container.name} size="mini"/>
  //     <Form>
  //       <Form.Field>
  //         <label>Name</label>
  //         <input onChange={this.handleInput} name="itemName" placeholder="Item name"/>
  //       </Form.Field>
  //
  //       <Form.Field>
  //         <label>Description</label>
  //         <input onChange={this.handleInput} name="itemDescription" placeholder="Item description"/>
  //       </Form.Field>
  //
  //       <Form.Field>
  //       <label>Owners</label>
  //         <Dropdown
  //         onChange = {this.handleOwnersInput}
  //         placeholder='Household Users'
  //         fluid
  //         multiple
  //         search
  //         selection
  //         options={currentHosueholdUsersOptions}
  //         />
  //       </Form.Field>
  //
  //       <Button onClick={this.setAddingItem} floated="right" size="mini">Cancel</Button>
  //       <Button onClick={this.addItem} floated="right" size="mini">Submit</Button>
  //     </Form>
  //   </Segment>
  // }

  setDeletingContainer = () => {
    this.setState({
      deletingContainer: !this.state.deletingContainer
    })
  }

  setEditingContainer = () => {
    this.setState({
      editingContainer: !this.state.editingContainer
    })
  }

  // renderDeletingHeader = () => {
  //   return <Button color="red" size="mini" style={{marginTop:""}} onClick={this.setDeletingContainer}>Delete Container</Button>
  // }
  // renderEditContainerForm = () => {
  //   return <Segment clearing>
  //   <Message header={"Edit " + this.props.container.name} size="mini"/>
  //   <Form>
  //     <Form.Field>
  //       <label>New Name</label>
  //       <input onChange={this.handleInput} name="newContainerName" placeholder={this.props.container.name}/>
  //     </Form.Field>
  //     <Button onClick={this.setEditingContainer} floated="right" size="mini">Cancel</Button>
  //     <Button onClick={this.editContainer} floated="right" size="mini">Submit</Button>
  //   </Form>
  //   </Segment>
  // }


  // renderDeletingForm = () => {
  //   return <Segment clearing raised>
  //     <Form>
  //       <Form.Field>
  //         <title>Password</title>
  //         <input type="password" name="householdPassword" onChange={this.handleInput} placeholder="Please enter Household Password"/>
  //       </Form.Field>
  //       <Button floated="right" size="mini"
  //       onClick={this.setDeletingContainer}>Cancel</Button>
  //       <Button floated="right" size="mini" onClick={this.deleteContainer} color="red">Delete Container</Button>
  //     </Form>
  //   </Segment>
  // }

  // deleteContainer = () => {
  //   fetch(`${API_ENDPOINT}/api/v1/containers/${this.props.container.id}`,{
  //     method:"DELETE",
  //     headers:{
  //       'Content-Type':'application/json',
  //       Accept: 'application/json'
  //     },
  //     body:JSON.stringify({
  //       container:{
  //         container_id:this.props.container.id,
  //         household_id: this.props.household.id,
  //         password: this.state.householdPassword
  //       }
  //     })
  //   }).then(resp=>resp.json())
  //   .then(data=>{
  //     // console.log(data)
  //     if (data.hasOwnProperty("id")) {
  //       this.props.setCurrentSpace(data)
  //     } else {
  //       this.setState({
  //         errorMessage: data.message
  //       })
  //     }
  //     this.setState({
  //       deletingHousehold: !this.state.deletingHousehold
  //     })
  //   })
  // }

  // editContainer = () => {
  //   fetch(`${API_ENDPOINT}/api/v1/containers/${this.props.container.id}`,{
  //     method:"PATCH",
  //     headers:{
  //       'Content-Type':'application/json',
  //       Accept: 'application/json'
  //     },
  //     body:JSON.stringify({
  //       container:{
  //         name: this.state.newContainerName,
  //         container_id:this.props.container.id,
  //         household_id: this.props.household.id,
  //         password: this.state.householdPassword
  //       }
  //     })
  //   }).then(resp=>resp.json())
  //   .then(data=>{
  //     // console.log(data)
  //     if (data.hasOwnProperty("id")) {
  //       this.props.setCurrentSpace(data)
  //     } else {
  //       this.setState({
  //         errorMessage: data.message
  //       })
  //     }
  //     this.setState({
  //       deletingHousehold: !this.state.deletingHousehold
  //     })
  //   })
  // }

  renderErrorMessage = () => {
    return <Message warning>{this.state.errorMessage}</Message>
  }

  render(){

    const { editingContainer, addingItem, deletingContainer} = this.state

    return(
      <>
        {this.state.errorMessage !== "" ? this.renderErrorMessage() : null}
      <div style={{minHeight:"200px"}}>
          <>

          <div className='d-flex justify-content-between'>

            <div className='d-flex flex-column'>
              <span className='font-weight-bold text-nowrap'>{this.props.container.name}</span>
              <span className='text-muted text-nowrap small-font'style={{paddingLeft:'5%'}}>in {this.props.space.name} at {this.props.household.name}</span>
            </div>

            <div className='d-flex'>
              <Dropdown floated="right" pointing="top right" style={{}} text="Container">
                <Dropdown.Menu>
                  <Dropdown.Item text="Add Item" onClick={this.setAddingItem}/>
                  <Dropdown.Item text="Edit Container" onClick={this.setEditingContainer}/>
                  <Dropdown.Item text="Delete Container" onClick={this.setDeletingContainer}/>
                  <Dropdown.Item text="Back To Space" onClick={() => this.props.setCurrentContainer({})}/>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>

          { deletingContainer ? <DeleteContainerForm setDeletingContainer={this.setDeletingContainer}/> : null}
          { addingItem ? <AddItemForm setAddingItem={this.setAddingItem} /> : null}
          { editingContainer ? <EditContainerForm setEditingContainer={this.setEditingContainer}/> : null }
          {this.renderItemCards()}

          </>

      </div>
      </>
    )
  }
}




const mapStateToProps = (state) => {
  return {
    conatiner: state.container,
    space: state.space,
    household: state.household
   }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    setCurrentSpace: (space) => dispatch({type:"SET_CURRENT_SPACE"}),
    addItem: (item) => dispatch({type:"ADD_ITEM", item}),
    setCurrentContainer: (container) =>
      dispatch({type:"SET_CURRENT_CONTAINER", container}),
    setCurrentItem: (item) => dispatch({type:"SET_CURRENT_ITEM", item})
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Container)