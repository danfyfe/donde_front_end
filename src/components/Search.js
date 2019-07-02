import React, { Component, } from 'react'
import { Segment, Form } from 'semantic-ui-react'


import SearchedHouseholdsContainer from './SearchedHouseholdsContainer.js'
import SearchedItemsContainer from './SearchedItemsContainer'

class Search extends Component {

  state = {
    households: [],
    items: [],
    searching: false,
    searchTerm:''
  }

  componentDidMount(){
    fetch('http://localhost:3000/api/v1/households',{
      method:"GET",
      headers: { Authorization:  localStorage.getItem("token") }
    }).then(resp=>resp.json())
    .then(households=>{
      // console.log('ALL USERS', households)
      this.setState({
        households: households
      })
    })
    .then(
      fetch('http://localhost:3000/api/v1/items',{
        method:"GET",
        headers: { Authorization:  localStorage.getItem("token") }
      }).then(resp=>resp.json())
      .then(items=>{
        // console.log('ALL ITEMS', items)
        this.setState({
          items: items
        })
      })
    )
  }

  redirectToItemPage = (id) => {
    this.props.history.push(`/items/${id}`)
  }

  setSearchTerm = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render(){
    // console.log('search state',this.state)
    return(
      <Segment clearing raised style={{width:"98%", margin:"10px auto"}}>

        <Form>
          <Form.Field>
          <label>Search</label>
          <input onChange={this.setSearchTerm} name="searchTerm" placeholder="Start typing to search"/>
          </Form.Field>
        </Form>

        <Segment>
          Items
          <SearchedItemsContainer history={this.props.history} searchTerm={this.state.searchTerm}
          items={this.state.items}/>
          Households
          <SearchedHouseholdsContainer
          history={this.props.history}
          searchTerm={this.state.searchTerm} households={this.state.households}/>
        </Segment>







      </Segment>
    )
  }
}

export default Search