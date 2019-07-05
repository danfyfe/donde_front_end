import React, { Component, } from 'react'
import { Segment, Menu, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'

import HouseholdContainer from './HouseholdContainer.js'
import HouseholdMessagesContainer from './HouseholdMessagesContainer.js'
import Search from './Search.js'
import Loading from './Loading.js'



class HouseholdPage extends Component {

  componentDidMount(){
    this.props.isFetching()

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
      console.log(this.props.state.user)
      this.props.setCurrentHousehold(household)
      if (this.props.state.currentHousehold) {
        this.props.isDoneFetching()
      }
      // try setting member of household here
    })
    )
  }





  render(){

    return(
      <>
        {this.props.state.isDoneFetching ?

          <>
          <Menu style={{marginTop: "0px"}}>
          <Header style={{padding:"10px"}}>Welcome, {this.props.state.user.username}!</Header>
          </Menu>

          {this.props.state.searching ? <Search history={this.props.history}/> : null}

          <Segment raised style={{margin:"10px auto",width:"98%"}}>
          <HouseholdContainer history={this.props.history}/>
          <HouseholdMessagesContainer />
          </Segment>
          </> : <Loading/>
        }

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
    isFetching: () => dispatch({type:"IS_FETCHING"}),
    isDoneFetching: () => dispatch({type:"IS_DONE_FETCHING"})
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(HouseholdPage)

// household={this.props.state.currentHousehold}