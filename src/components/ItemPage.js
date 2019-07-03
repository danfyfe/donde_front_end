import React, { Component, } from 'react'
import { Segment, Header, Form, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux'



class ItemPage extends Component {

  state = {
    editing: false,
    itemName: "",
    itemDescription: "",

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

  setEditing = () => {
    this.setState({
      editing: !this.state.editing
    })
  }

  renderEditHeader = () => {
    return <Header onClick={this.setEditing} color="blue">Edit Item</Header>
  }

  renderEditForm = () => {
    return <Segment>
      <Form>
        <Form.Field>
          <label>Name</label>
          <input onChange={this.handleItemNameInput} placeholder="Item name" value={this.state.itemName}/>
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <input onChange={this.handleItemDescriptionInput} placeholder="Item description" value={this.state.itemDescription}/>
        </Form.Field>
      </Form>
    </Segment>
  }
  render(){
    // console.log(this.props.state.currentItem.space.name)
    console.log(this.props.state.currentItem.household)
    // console.log('item page state', this.state)

    return(
      <Segment.Group style={{margin:"2% auto",width:"98%"}}>
        <Segment>
        {this.renderEditHeader()}
        {this.renderEditForm()}
          <Header>{this.props.state.currentItem.name}</Header>
        </Segment>
        <Segment.Group>
          <Segment>
            {this.renderLocationDetails()}
          </Segment>
        </Segment.Group>

        <Segment>Owners:</Segment>
        <Segment.Group>
            {this.renderOwners()}
        </Segment.Group>

      </Segment.Group>
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