import React, { Component, } from 'react'
import { Segment, Form, Button, Message, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'

import SearchedHouseholdsContainer from '../containers/SearchedHouseholdsContainer.js'
import SearchedItemsContainer from '../containers/SearchedItemsContainer'

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

    return(

        <Segment clearing raised style={{margin:"0 10px", backgroundColor:"#f7f7f7"}}>
          <Segment clearing>
            <Message header="Search for a Household and/or Item!" size="mini"/>
            <Form floated="left">
              <Form.Field>
              <label>Search</label>
              <input onChange={this.setSearchTerm} name="searchTerm" placeholder="Start typing to search"/>
              </Form.Field>
              <Button onClick={this.props.setSearching}floated="right" style={{margin:"2% 0 0 0 0"}} size="mini">Cancel</Button>
            </Form>
          </Segment>
          {this.state.searchTerm === "" ?  null :

        <Grid columns={2}>
          <Grid.Column>

            <>
              <Message size="mini">Households</Message>
              <SearchedHouseholdsContainer
              history={this.props.history}
              searchTerm={this.state.searchTerm} households={this.state.households}/>
            </>
          </Grid.Column>
          <Grid.Column>
            <>
              <Message size="mini">Items</Message>
              <SearchedItemsContainer history={this.props.history} searchTerm={this.state.searchTerm}
              items={this.state.items}/>
            </>
            </Grid.Column>

        </Grid>
        }

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