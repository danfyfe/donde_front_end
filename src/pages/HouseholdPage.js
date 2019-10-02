import React, { Component, } from 'react'
import { Segment, Menu, Header, Message, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getUser } from '../actions/userActions.js'
import { getCurrentHousehold } from '../actions/householdActions.js'

import HouseholdContainer from '../containers/HouseholdContainer.js'
import HouseholdMessagesContainer from '../containers/HouseholdMessagesContainer.js'
import Search from '../components/Search.js'
import Loading from '../components/Loading.js'
import JoinOrLeaveHouseholdForm from '../components/forms/households/JoinOrLeaveHouseholdForm.js'

class HouseholdPage extends Component {

  state = {
    joingingHousehold: false
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
                <div className='big-container'>
                  <HouseholdContainer history={this.props.history}/>
                </div>
                <div className='big-container'>
                  <HouseholdMessagesContainer />
                </div>
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



    // isFetching: () => dispatch({type:"IS_FETCHING"}),
    // isDoneFetching: () => dispatch({type:"IS_DONE_FETCHING"}),
    // isUsersHousehold: () => dispatch({type:"IS_USERS_HOUSEHOLD"}),
    // addHouseholdToCurrentUser: (household) => dispatch({type:"ADD_HOUSEHOLD_TO_CURRENT_USER", household}),
    // itemDeleteConfirmationToNothing: () => dispatch({type:"ITEM_DELETE_CONFIRMATION_TO_NOTHING"})
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(HouseholdPage)