import React, { Component, } from 'react'
import { Segment, Menu, Header, Message, Button, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getUser } from '../actions/userActions.js'
import { getCurrentHousehold } from '../actions/householdActions.js'

import HouseholdContainer from '../containers/HouseholdContainer.js'
import HouseholdMessagesContainer from '../containers/HouseholdMessagesContainer.js'
import Search from '../components/Search.js'
import Loading from '../components/Loading.js'
import JoinOrLeaveHouseholdForm from '../components/forms/households/JoinOrLeaveHouseholdForm.js'

let API_ENDPOINT
if (process.env.NODE_ENV === 'production') {
  API_ENDPOINT = 'https://df-donde-api.herokuapp.com'
} else {
  API_ENDPOINT = 'http://localhost:3000'
}

class HouseholdPage extends Component {

  state = {
    joingingHousehold: false,
    householdPassword: ""
  }

  componentDidMount(){
    const { id } = this.props.match.params
    this.props.setUser()
    this.props.setCurrentHousehold(id)
  }


  isUsersHousehold = () => {
    let isUserHousehold
    if (this.props.user && this.props.household) {

      if (this.props.user.households) {
        isUserHousehold = this.props.user.households.filter(household => {
          return household.id === this.props.household.id
        })
      }
    }
    if (isUserHousehold && isUserHousehold.length) {
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

  // renderJoinHouseholdForm = () => {
  //   return <>
  //     <Form>
  //       <Form.Field>
  //         <label>Password</label>
  //         <input type="password" name="householdPassword" onChange={this.handleInput} placeholder="Please enter Household Password"/>
  //       </Form.Field>
  //       <Button floated="right" size="mini"
  //       onClick={this.setJoiningHousehold}>Cancel</Button>
  //       <Button floated="right" size="mini" onClick={this.joinHousehold}>Submit</Button>
  //     </Form>
  //     </>
  // }

  // joinHousehold = () => {
  //   fetch(`${API_ENDPOINT}/api/v1/households/${this.props.user.id}/${this.props.household.id}`,{
  //     method:"POST",
  //     headers:{
  //       'Content-Type':'application/json',
  //       Accept: 'application/json'
  //     },
  //     body:JSON.stringify({
  //       join:{
  //         user_id: this.props.user.id,
  //         household_id: this.props.household.id,
  //         password: this.state.householdPassword
  //       }
  //     })
  //   }).then(resp=>resp.json())
  //   .then(household=>{
  //     this.props.addHouseholdToCurrentUser(household)
  //
  //     this.setState({
  //       joiningHousehold: !this.state.joiningHousehold,
  //       household: household
  //     })
  //
  //     this.props.history.push(`/households/${household.id}`)
  //
  //   })
  // }

  // renderDeleteConfirmationMessage = () => {
  //   return <Message floated="center" style={{textAlign:"center", margin:"1% 5%"}} warning>{this.props.itemDeleteConfirmationMessage}</Message>
  // }
  //
  // setItemDeleteConfirmationMessageToNothing = () => {
  //   if (this.props.itemDeleteConfirmationMessage !== "") {
  //     setTimeout(()=>{
  //       this.props.itemDeleteConfirmationToNothing()
  //     },3000)
  //   }
  // }

  render(){
    if (!localStorage.token || localStorage.token === "undefined") {
    this.props.history.push("/")
    }
    return(
      <>
      {/*this.setItemDeleteConfirmationMessageToNothing()*/}
        {this.props.user ?
          <>

          <Menu style={{margin: "0px", borderRadius:'0'}}>
            <Header style={{padding:"10px"}}>Welcome, {this.props.user.username}!</Header>
          </Menu>

          {/*this.props.itemDeleteConfirmationMessage !== "" ? this.renderDeleteConfirmationMessage() : null*/}

          {this.props.searching ? <Search history={this.props.history}/> : null}

          <Segment className='household-container' style={{margin:"auto", width:"100%", backgroundColor:"#f7f7f7", border:'none'}}>

          {this.isUsersHousehold() ?
              <>
                <HouseholdContainer history={this.props.history}/>
                <HouseholdMessagesContainer />
              </> :
              <Segment clearing className='full-width'>
                <Header>{this.props.household.name}</Header>
                <Message warning><Header>You must join this household to view its details!</Header>
                </Message>
                  {this.state.joiningHousehold ? <JoinOrLeaveHouseholdForm type={'join'} householdId={this.props.household.id} userId={this.props.user.id}
                  setJoiningHousehold={this.setJoiningHousehold}/> : this.renderJoinHouseholdHeader()}
              </Segment>
            }
          </Segment>
          </> : <Loading/>
        }

      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    household: state.household,
    searching: state.app.searching
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    setUser: () => dispatch(getUser()),
    setCurrentHousehold: (householdId) => dispatch(getCurrentHousehold(householdId)),



    isFetching: () => dispatch({type:"IS_FETCHING"}),
    isDoneFetching: () => dispatch({type:"IS_DONE_FETCHING"}),
    isUsersHousehold: () => dispatch({type:"IS_USERS_HOUSEHOLD"}),
    addHouseholdToCurrentUser: (household) => dispatch({type:"ADD_HOUSEHOLD_TO_CURRENT_USER", household}),
    itemDeleteConfirmationToNothing: () => dispatch({type:"ITEM_DELETE_CONFIRMATION_TO_NOTHING"})
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(HouseholdPage)