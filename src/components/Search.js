import React, { Component, } from 'react'
import { Segment, Form, Button, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'

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

  // can probs delete this
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

        <Segment clearing raised style={{margin:"0 10px"}}>
        <Message header="Search for a Household and/or Item!"/>
          <Form>
            <Form.Field>
            <label>Search</label>
            <input onChange={this.setSearchTerm} name="searchTerm" placeholder="Start typing to search"/>
            </Form.Field>
          </Form>
          {this.state.searchTerm === "" ?  null :

          <Segment>
            <>
              <Message size="mini">Households</Message>
              <SearchedHouseholdsContainer
              history={this.props.history}
              searchTerm={this.state.searchTerm} households={this.state.households}/>
            </>

            <>
              <Message size="mini">Items</Message>
              <SearchedItemsContainer history={this.props.history} searchTerm={this.state.searchTerm}
              items={this.state.items}/>
            </>
            </Segment>
        }
          <Button onClick={this.props.setSearching}floated="right">Cancel</Button>

          </Segment>

    )
  }
}


const mapStateToProps = (state) => {
  return { state }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSearching: ()=> dispatch({type:"SET_SEARCHING"})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Search)