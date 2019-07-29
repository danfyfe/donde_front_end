import React, { Component, } from 'react'
import { Segment, Card, Menu, Header, Form, Button, Message } from 'semantic-ui-react'
import {connect} from 'react-redux'

import ItemCard from '../components/ItemCard.js'
import Search from '../components/Search.js'
import Loading from '../components/Loading.js'

class ItemsPage extends Component {
  state = {
    items: [],
    addingItem: false,
    itemName: "",
    itemDescription:"",
  }

  componentDidMount(){
    this.props.isFetching()
    fetch('https://df-donde-api.herokuapp.com/api/v1/profile',{
      method:"POST",
      headers: { Authorization:  localStorage.getItem("token") }
    }).then(resp=>resp.json())
    .then(user=>{
      this.props.setUser(user.user)
    }).then(
      fetch('https://df-donde-api.herokuapp.com/api/v1/items',{
        method:"GET",
        headers: { Authorization:  localStorage.getItem("token") }
      }).then(resp=>resp.json())
      .then(items => {
        this.setState({
          items: items
        })
        this.props.isDoneFetching()
      })
    )
  }

  redirectToItemPage = (item) => {
    this.props.history.push(`/items/${item.id}`)
    this.props.setSearchingToFalse()
    this.props.setCurrentItem(item)
  }

  renderItems = () => {
    if (this.props.state.user.households) {
      let householdItems = []

      this.props.state.user.households.map(household => {
        return householdItems = [...householdItems, household.items].flat()
      })

      if (householdItems.length === 0) {
        return <Message warning style={{margin:" 5% auto"}}>You do not currently have access to any items. Create and item through a household or join a household!</Message>
      } else {
        return householdItems.map(item => {
          return <ItemCard key={item.id} redirectToItemPage={this.redirectToItemPage} history={this.props.history}  item={item}/>
        })
      }
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

  renderAddItemHeader = () => {
    return <Button onClick={this.setAddItem} color="blue" size="mini">Add Item</Button>
  }

  renderAddItemForm = () => {
    return <Segment clearing>
    <Message>Add an Item</Message>
      <Form>
        <Form.Field>
          <label>Name</label>
          <input onChange={this.handleInput} name="itemName" placeholder="Item name"/>
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <input onChange={this.handleInput} name="itemDescription" placeholder="Item description"/>
        </Form.Field>

        <Button onClick={this.setAddItem} floated="right" size="mini">Cancel</Button>
        <Button floated="right" size="mini">Submit</Button>
      </Form>
    </Segment>
  }

  render(){

    if (!localStorage.token || localStorage.token === "undefined") {
    this.props.history.push("/")
    }

    return(
      <>
      {this.props.state.isDoneFetching ? null
        : <Loading/>
      }
      <Menu style={{marginTop: "0px"}}>
        <Header style={{padding:"10px"}}>Welcome to {this.props.state.user.username}'s Household Items!</Header>
      </Menu>

        {this.props.state.searching ? <Search history={this.props.history}/> : null}

      <Segment style={{margin: "1% auto",width:"98%"}}>
        <Card.Group itemsPerRow={8}>
          {this.renderItems()}
        </Card.Group>
      </Segment>
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
      setHouseholds: (households) => dispatch({type:"SET_HOUSEHOLDS",households}),
      addHousehold: (household) => dispatch({type:"ADD_HOUSEHOLD", household}),
      isFetching: () => dispatch({type:"IS_FETCHING"}),
      isDoneFetching: () => dispatch({type:"IS_DONE_FETCHING"}),
      setCurrentItem: (item) => dispatch({type:"SET_CURRENT_ITEM", item}),
      setSearchingToFalse: () => dispatch({type:"SET_SEARCHING_TO_FALSE"})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ItemsPage)