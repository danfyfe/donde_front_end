import React, { Component, } from 'react'
import { Segment, Form, Button, Message, Grid, Checkbox } from 'semantic-ui-react'
import { connect } from 'react-redux'

import SearchedHouseholdsContainer from '../containers/SearchedHouseholdsContainer.js'
import SearchedItemsContainer from '../containers/SearchedItemsContainer'


let API_ENDPOINT
if (process.env.NODE_ENV === 'production') {
  API_ENDPOINT = 'https://df-donde-api.herokuapp.com'
} else {
  API_ENDPOINT = 'http://localhost:3000'
}

class Search extends Component {

  state = {
    households: [],
    items: [],
    searching: false,
    searchTerm:'',
    filterBy: 'none'
  }

  componentDidMount(){
    fetch(`${API_ENDPOINT}/api/v1/households`,{
      method:"GET",
      headers: { Authorization:  localStorage.getItem("token") }
    }).then(resp=>resp.json())
    .then(households=>{

      this.setState({
        households: households
      })
    })
    .then(
      fetch(`${API_ENDPOINT}/api/v1/items`,{
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


 handleChange = (e, { value }) => this.setState({ filterBy: value })

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

              <Form.Field>
              <div className='d-flex flex-column'>
                <label className='font-weight-bold'>Filter By</label>
                <div className='d-flex flex-row m-auto'>
                <Form.Radio style={{margin:'0 1vw'}}
                  label='None'
                  value='none'
                  checked={this.state.filterBy === 'none'}
                  onChange={this.handleChange}
                />
                <Form.Radio style={{margin:'0 1vw'}}
                  label='Households'
                  value='households'
                  checked={this.state.filterBy === 'households'}
                  onChange={this.handleChange}
                />
                <Form.Radio style={{margin:'0 1vw'}}
                  label='Items'
                  value='items'
                  checked={this.state.filterBy === 'items'}
                  onChange={this.handleChange}
                />
                </div>
                </div>
              </Form.Field>
              <Button onClick={this.props.setSearching}floated="right" style={{margin:"2% 0 0 0 0"}} size="mini">Cancel</Button>
            </Form>
          </Segment>
          {this.state.searchTerm === "" ?  null :

        <Grid columns={1}>
          <Grid.Column>
          {this.state.filterBy === 'none' || this.state.filterBy ==='households' ?
            <>
            <Message size="mini">Households</Message>
            <SearchedHouseholdsContainer
            history={this.props.history}
            searchTerm={this.state.searchTerm} households={this.state.households}/>
            </> : null
          }
          </Grid.Column>
          <Grid.Column>
          {this.state.filterBy === 'none' || this.state.filterBy==='items' ?
            <>
            <Message size="mini">Items</Message>
            <SearchedItemsContainer history={this.props.history} searchTerm={this.state.searchTerm}
            items={this.state.items}/>
            </> : null
          }
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