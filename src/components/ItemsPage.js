import React, { Component, } from 'react'
import { Segment, Card, Menu, Header } from 'semantic-ui-react'
import {connect} from 'react-redux'
import ItemCard from './ItemCard.js'
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


  renderItems = () => {
    // if (this.props.state.user) {
    //   return this.props.state.user.items.map(item => {
    //       return <Card/>
    //     })
    // }
    // console.log(this.props.state.user)
    return this.state.items.map(item => {
      return <ItemCard item={item}/>
    })
  }

  render(){
    // TRY CONST FUNCTIONS HERE
    console.log("ITEMS PAGE",this.props.state.user)
    return(
      <>
      <Menu style={{marginTop: "0px"}}>
        <Header style={{padding:"10px"}}>Welcome {this.props.state.user.username}'s Items!</Header>
      </Menu>
      <Segment>
        <Card.Group>
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