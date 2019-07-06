import React, { Component, } from 'react'
import { Segment, Menu, Header, Message, Button, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'

import HouseholdContainer from './HouseholdContainer.js'
import HouseholdMessagesContainer from './HouseholdMessagesContainer.js'
import Search from './Search.js'
import Loading from './Loading.js'



class HouseholdPage extends Component {
  state = {
    user: {},
    household: {},
    joingingHousehold: false,
    householdPassword: ""
  }
  componentDidMount(){
    this.props.isFetching()

    fetch('http://localhost:3000/api/v1/profile',{
      method:"POST",
      headers: { Authorization:  localStorage.getItem("token") }
    }).then(resp=>resp.json())
    .then(user=>{

      this.props.setUser(user.user)

      this.setState({
        user: user.user
      })

    }).then(
    fetch(`http://localhost:3000/api/v1/households/${this.props.match.params.id}`,{
      method: "GET",
      headers: { Authorization:  localStorage.getItem("token") }
    })
    .then(resp=>resp.json())
    .then(household=>{
      // console.log(this.props.state.user)

      this.props.setCurrentHousehold(household)

      this.setState({
        household: household
      })

      if (this.props.state.currentHousehold && this.state.household && this.state.user) {
        this.props.isDoneFetching()
      }
      // try setting member of household here
    })
    )
  }


  isUsersHousehold = () => {
    let isUserHousehold
    if (this.state.user && this.state.household) {

      if (this.state.user.households) {
        isUserHousehold = this.state.user.households.filter(household => {
          return household.id === this.state.household.id
        })
      }
    }
    if (isUserHousehold && isUserHousehold.length) {
      // console.log(isUserHousehold)
      return isUserHousehold
    }
  }

  handleInput = (e) => {
      this.setState({
        [e.target.name]:e.target.value
      })
  }

  setJoiningHousehold = () => {
    this.setState({
      joiningHousehold: !this.state.joiningHousehold
    })
  }

  renderJoinHouseholdHeader = () => {
    return <Button onClick={this.setJoiningHousehold} color="blue" floated="right" size="mini">Join Household</Button>
  }

  renderJoinHouseholdForm = () => {
    return <>
      <Form>
        <Form.Field>
          <title>Password</title>
          <input type="password" name="householdPassword" onChange={this.handleInput} placeholder="Please enter Household Password"/>
        </Form.Field>
        <Button floated="right"
        onClick={this.setJoiningHousehold}>Cancel</Button>
        <Button floated="right" onClick={this.joinHousehold}>Submit</Button>
      </Form>
      </>
  }

  joinHousehold = () => {
    // this.props.isFetching()
    fetch(`http://localhost:3000/api/v1/households/${this.props.state.user.id}/${this.props.state.currentHousehold.id}`,{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
        Accept: 'application/json'
      },
      body:JSON.stringify({
        join:{
          user_id: this.props.state.user.id,
          household_id: this.props.state.currentHousehold.id,
          password: this.state.householdPassword
        }
      })
    }).then(resp=>resp.json())
    .then(household=>{
      // this.props.setCurrentHousehold(household)
      //
      this.setState({
        joiningHousehold: !this.state.joiningHousehold,
        household: household
      })

      // this.props.isDoneFetching()
      // this.props.history.push(`/households/${household.id}`)

    })
  }

  render(){
    // console.log(this.state)
    if (!localStorage.token || localStorage.token === "undefined") {
    this.props.history.push("/")
    }
    return(
      <>
        {this.props.state.isDoneFetching ?
          <>
          <Menu style={{marginTop: "0px"}}>
          <Header style={{padding:"10px"}}>Welcome, {this.props.state.user.username}!</Header>
          </Menu>

          {this.props.state.searching ? <Search history={this.props.history}/> : null}

          <Segment raised style={{margin:"10px auto",width:"98%"}}>

          {this.isUsersHousehold() ?
              <>
              <HouseholdContainer history={this.props.history}/>
              <HouseholdMessagesContainer />
              </> :

              <Segment clearing>
                <Message warning clearing><Header>You must join this household to view its details!</Header>
                </Message>
                  {this.state.joiningHousehold ? this.renderJoinHouseholdForm() : this.renderJoinHouseholdHeader()}
              </Segment>
            }
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
    isDoneFetching: () => dispatch({type:"IS_DONE_FETCHING"}),
    isUsersHousehold: () => dispatch({type:"IS_USERS_HOUSEHOLD"})
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(HouseholdPage)

// household={this.props.state.currentHousehold}