import React, { Component, } from 'react'
import { Segment, Card, Menu, Header } from 'semantic-ui-react'
import {connect} from 'react-redux'


import ItemCard from './ItemCard.js'
import Search from './Search.js'

class ItemsPage extends Component {
  state = {
    items: []
  }

  componentDidMount(){
    fetch('http://localhost:3000/api/v1/profile',{
      method:"POST",
      headers: { Authorization:  localStorage.getItem("token") }
    }).then(resp=>resp.json())
    .then(user=>{
      // console.log("USER", user)
      this.props.setUser(user.user)
    }).then(
      fetch('http://localhost:3000/api/v1/items',{
        method:"GET",
        headers: { Authorization:  localStorage.getItem("token") }
      }).then(resp=>resp.json())
      .then(items => {
        // console.log("ITEMSSS",items)
        this.setState({
          items: items
        })
      })
    )
  }

  redirectToItemPage = (id) => {
    this.props.history.push(`/items/${id}`)
  }

  renderItems = () => {
    if (this.props.state.user.households) {
      let householdItems = []

      this.props.state.user.households.map(household => {
        return householdItems = [...householdItems, household.items].flat()
      })

      return householdItems.map(item => {
        return <ItemCard key={item.id} redirectToItemPage={this.redirectToItemPage} history={this.props.history}  item={item}/>
      })
    }
  }

  render(){
    // console.log("ITEMS PAGE",this.props)
    return(
      <>
      <Menu style={{marginTop: "0px"}}>
        <Header style={{padding:"10px"}}>Welcome to {this.props.state.user.username}'s Household Items!</Header>
      </Menu>

        {this.props.state.searching ? <Search history={this.props.history}/> : null}

      <Segment>
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
      addHousehold: (household) => dispatch({type:"ADD_HOUSEHOLD", household})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ItemsPage)