import React, { Component } from 'react'
import { Segment, Header, Form, Button, Message, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux'

import ItemCard from './ItemCard.js'


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
    // console.log(data.value)
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

    return <Segment clearing raised style={{marginTop:"2%"}}>
    <Message header={"Add an Item to " + this.props.state.currentContainer.name} size="mini"/>
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



        <Button onClick={this.setAddingItem} floated="right" size="mini">Cancel</Button>
        <Button onClick={this.addItem} floated="right" size="mini">Submit</Button>
      </Form>
    </Segment>
  }

  setDeletingContainer = () => {
    this.setState({
      deletingContainer: !this.state.deletingContainer
    })
  }

  renderDeletingHeader = () => {
    return <Button color="red" size="mini" style={{marginTop:""}} onClick={this.setDeletingContainer}>Delete Container</Button>
  }

  renderDeletingForm = () => {
    return <Segment clearing raised>
      <Form>
        <Form.Field>
          <title>Password</title>
          <input type="password" name="householdPassword" onChange={this.handleInput} placeholder="Please enter Household Password"/>
        </Form.Field>
        <Button floated="right" size="mini"
        onClick={this.setDeletingContainer}>Cancel</Button>
        <Button floated="right" size="mini" onClick={this.deleteContainer} color="red">Delete Container</Button>
      </Form>
    </Segment>
  }

  deleteContainer = () => {
    fetch(`http://localhost:3000/api/v1/containers/${this.props.state.currentContainer.id}`,{
      method:"DELETE",
      headers:{
        'Content-Type':'application/json',
        Accept: 'application/json'
      },
      body:JSON.stringify({
        container:{
          container_id:this.props.state.currentContainer.id,
          household_id: this.props.state.currentHousehold.id,
          password: this.state.householdPassword
        }
      })
    }).then(resp=>resp.json())
    .then(data=>{
      // console.log(data)
      if (data.hasOwnProperty("id")) {
        this.props.setCurrentSpace(data)
      } else {
        this.setState({
          errorMessage: data.message
        })
      }
      this.setState({
        deletingHousehold: !this.state.deletingHousehold
      })
      // this.props.history.push('/households/')
    })
  }

  renderErrorMessage = () => {
    return <Message warning>{this.state.errorMessage}</Message>
  }

  render(){
    // console.log(this.props.history)
    // console.log(this.state.errorMessage)
    return(
      <>
        {this.state.errorMessage !== "" ? this.renderErrorMessage() : null}
      <Segment clearing style={{minHeight:"500px"}}>
          <>
          <Header floated="left" as="h2">{this.props.container.name}</Header>
          <Header color="grey" floated="left" as="h2">in {this.props.state.currentSpace.name} at {this.props.state.currentHousehold.name}</Header>

          <Dropdown floated="right" pointing="top right" style={{margin:"0% 0 0 57%"}} text="Container">
            <Dropdown.Menu>
              <Dropdown.Item text="Add Item" onClick={this.setAddingItem}/>
              <Dropdown.Item text="Delete Container" onClick={this.setDeletingContainer}/>
              <Dropdown.Item text="Back To Space" onClick={() => this.props.setCurrentContainer({})}/>

            </Dropdown.Menu>
          </Dropdown>


          {this.state.deletingContainer ? this.renderDeletingForm() : null}
          {this.state.addingItem ? this.renderAddItemForm() : null}

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