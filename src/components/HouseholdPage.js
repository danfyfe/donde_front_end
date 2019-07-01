import React, { Component, } from 'react'
import { Segment, Menu, Header, Image} from 'semantic-ui-react'
import { connect } from 'react-redux'

import HouseholdContainer from './HouseholdContainer.js'
import HouseholdMessagesContainer from './HouseholdMessagesContainer.js'
import Search from './Search.js'



class HouseholdPage extends Component {
  // state = {
  //   household: {}
  // }

  componentDidMount(){
    fetch('http://localhost:3000/api/v1/profile',{
      method:"POST",
      headers: { Authorization:  localStorage.getItem("token") }
    }).then(resp=>resp.json())
    .then(user=>{
      this.props.setUser(user.user)
    }).then(
    fetch(`http://localhost:3000/api/v1/households/${this.props.match.params.id}`,{
      method: "GET",
      headers: { Authorization:  localStorage.getItem("token") }
    })
    .then(resp=>resp.json())
    .then(household=>{
      // console.log("HOUSEHOLD",household)
      this.props.setCurrentHousehold(household)
    })
  )
  }

  render(){
    // console.log("Household PORPS",this.props.state.currentHousehold)
    // console.log("Household STATE", this.state.household)
    // console.log(this.props)
    return(
      <>
        <Menu style={{marginTop: "0px"}}>
          <Header style={{padding:"10px"}}>{this.props.state.user.username}</Header>
          <Image src={this.props.state.user.image} size="mini"/>
        </Menu>

        {this.props.state.searching ? <Search history={this.props.history}/> : null}


        <Segment raised style={{margin:"10px auto",width:"98%"}}>
          <HouseholdContainer history={this.props.history}/>
          <HouseholdMessagesContainer household={this.props.state.currentHousehold}/>
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
    setCurrentHousehold: (household) => dispatch({type:"SET_CURRENT_HOUSEHOLD", household})
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(HouseholdPage)