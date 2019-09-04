import React, { Component } from 'react'
import { Segment, Header, Menu, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'

import HouseholdCardsContainer from '../containers/HouseholdCardsContainer.js'
import MessageContainer from '../containers/MessageContainer.js'
import Search from '../components/Search.js'
import Loading from '../components/Loading.js'

let API_ENDPOINT
if (process.env.NODE_ENV === 'production') {
  API_ENDPOINT = 'https://df-donde-api.herokuapp.com'
} else {
  API_ENDPOINT = 'http://localhost:3000'
}

class ProfilePage extends Component {
  componentDidMount(){
    this.props.isFetching()
    fetch(`${API_ENDPOINT}/api/v1/profile`,{
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

      {this.props.state.isDoneFetching && this.props.state.user.username ?
        <>

          <Menu style={{margin: "0px", borderRadius:'0'}}>
            <Header style={{padding:"10px"}}>Welcome, {this.props.state.user.username}!</Header>
          </Menu>

          {this.props.state.itemDeleteConfirmationMessage !== "" ? this.renderDeleteConfirmationMessage() : null}

          {this.props.state.searching ? <Search history={this.props.history}/> : null}

            <div className='profile-container'>
              <Segment raised className='' style={{width:"95%", margin:"2%", backgroundColor:"#f7f7f7", border:'none', borderRadius:'none'}}>
                <HouseholdCardsContainer history={this.props.history}
                />
              </Segment>

              <Segment raised className='' style={{width:"95%", margin:'2%', backgroundColor:"#f7f7f7", border:'none', borderRadius:'none'}}>
                <MessageContainer
                history={this.props.history}/>
              </Segment>

              </div>


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