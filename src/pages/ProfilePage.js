import React, { Component } from 'react'
import { Segment, Header, Menu, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getUser } from '../actions/userActions.js'

import HouseholdCardsContainer from '../containers/HouseholdCardsContainer.js'
import MessageContainer from '../containers/MessageContainer.js'
import Search from '../components/Search.js'
import Loading from '../components/Loading.js'

class ProfilePage extends Component {

  componentDidMount(){
    this.props.setUser()
  }


  renderDeleteConfirmationMessage = () => {
    return <Message floated="center" style={{textAlign:"center", margin:"1% 5%"}} warning>{this.props.itemDeleteConfirmationMessage}</Message>
  }

  setItemDeleteConfirmationMessageToNothing = () => {
    if (this.props.itemDeleteConfirmationMessage !== "") {
      setTimeout(()=>{
        this.props.itemDeleteConfirmationToNothing()
      },3000)
    }
  }

  render(){

    if (!localStorage.token || localStorage.token === "undefined") {
    this.props.history.push("/")
    }

    const { user, searching, history } = this.props

    return(
      <>
      {this.setItemDeleteConfirmationMessageToNothing()}

      {user.username ?
        <>

          <Menu style={{margin: "0px", borderRadius:'0'}}>
            <Header style={{padding:"10px"}}>Welcome, {user.username}!</Header>
          </Menu>

          {/*itemDeleteConfirmationMessage !== "" ? this.renderDeleteConfirmationMessage() : null*/}

          {searching ? <Search history={history}/> : null}

            <div className='profile-container'>

              <div className='big-container'>
                <Segment raised className='' style={{width:"95%", margin:"2%", backgroundColor:"#f7f7f7", border:'none', borderRadius:'none'}}>
                  <HouseholdCardsContainer
                    history={history}
                  />
                </Segment>
              </div>

              <div className='big-container'>
                <Segment raised className='' style={{width:"95%", margin:'2%', backgroundColor:"#f7f7f7", border:'none', borderRadius:'none'}}>
                  <MessageContainer
                  history={history}/>
                </Segment>
              </div>

            </div>


        </> : <Loading/>
      }
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    itemDeleteConfirmationMessage: state.itemDeleteConfirmationMessage,
    searching: state.app.searching,
   }
}

const mapDispatchToProps = dispatch =>{
  return {
    setUser: () => dispatch(getUser()),
    setSearching: () => dispatch({type:'SET_SEARCHING'}),
    itemDeleteConfirmationToNothing: () => dispatch({type:"ITEM_DELETE_CONFIRMATION_TO_NOTHING"})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProfilePage)