import React, { Component } from 'react'
import { Segment, Header, Menu, Grid, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'

import HouseholdCardsContainer from '../containers/HouseholdCardsContainer.js'
import MessageContainer from '../containers/MessageContainer.js'
import Search from '../components/Search.js'
import Loading from '../components/Loading.js'

class ProfilePage extends Component {
  componentDidMount(){
    this.props.isFetching()
    fetch('http://localhost:3000/api/v1/profile',{
      method:"POST",
      headers: { Authorization:  localStorage.getItem("token") }
    }).then(resp=>resp.json())
    .then(user=>{
      this.props.setUser(user.user)
      this.props.isDoneFetching()
    })
  }

  renderDeleteConfirmationMessage = () => {
    return <Message floated="center" style={{textAlign:"center", margin:"1% 5%"}} warning>{this.props.state.itemDeleteConfirmationMessage}</Message>
  }

  setItemDeleteConfirmationMessageToNothing = () => {
    if (this.props.state.itemDeleteConfirmationMessage !== "") {
      setTimeout(()=>{
        this.props.itemDeleteConfirmationToNothing()
      },3000)
    }
  }

  render(){

    if (!localStorage.token || localStorage.token === "undefined") {
    this.props.history.push("/")
    }

    return(
      <>
      {this.setItemDeleteConfirmationMessageToNothing()}

      {this.props.state.isDoneFetching ?
        <>

          <Menu style={{marginTop: "0px"}}>
            <Header style={{padding:"10px"}}>Welcome, {this.props.state.user.username}!</Header>
          </Menu>

          {this.props.state.itemDeleteConfirmationMessage !== "" ? this.renderDeleteConfirmationMessage() : null}

          {this.props.state.searching ? <Search history={this.props.history}/> : null}

          <Grid columns={2}>

            <Grid.Column>
              <Segment raised style={{width:"98%", margin:"10px ", backgroundColor:"#f7f7f7"}}>
                <HouseholdCardsContainer history={this.props.history}
                />
              </Segment>
            </Grid.Column>

            <Grid.Column>
              <Segment raised style={{width:"98%", margin:"10px", backgroundColor:"#f7f7f7"}}>
                <MessageContainer
                history={this.props.history}/>
              </Segment>
            </Grid.Column>

          </Grid>

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
    isFetching: () => dispatch({type:"IS_FETCHING"}),
    isDoneFetching: () => dispatch({type:"IS_DONE_FETCHING"}),
    setSearchingToFalse: () => dispatch({type:"SET_SEARCHING_TO_FALSE"}),
    itemDeleteConfirmationToNothing: () => dispatch({type:"ITEM_DELETE_CONFIRMATION_TO_NOTHING"})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProfilePage)




  // <Dropdown placeholder="Color" name="househholdColor" search selection options={householdColorOptions} onSelect={this.handleHouseholdInput}/>



  // <>
  //   <Menu style={{marginTop: "0px"}}>
  //     <Header style={{padding:"10px"}}>Welcome User !</Header>
  //   </Menu>
  //
  //   <Segment raised style={{width:"98%", margin:"10px auto"}}>
  //     <HouseholdCardsContainer
  //     user={this.state.userData.user} history={this.props.history} households={this.state.households}/>
  //   </Segment>
  //
  //   <Segment raised style={{width:"98%", margin:"10px auto"}}>
  //       <MessageContainer  user={this.state.userData.user}
  //       history={this.props.history}/>
  //   </Segment>
  // </>