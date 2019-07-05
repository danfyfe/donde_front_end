import React, { Component } from 'react'
import { Segment, Header, Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'


import HouseholdCardsContainer from './HouseholdCardsContainer.js'
import MessageContainer from './MessageContainer.js'
import Search from './Search.js'
import Loading from './Loading.js'


// import withAuth from '../hocs/withAuth'

class ProfilePage extends Component {
  componentDidMount(){
    this.props.isFetching()
    fetch('http://localhost:3000/api/v1/profile',{
      method:"POST",
      headers: { Authorization:  localStorage.getItem("token") }
    }).then(resp=>resp.json())
    .then(user=>{
      // console.log("USER", user)
      this.props.setUser(user.user)
      this.props.isDoneFetching()
    })
  }

  render(){

    if (!localStorage.token || localStorage.token === "undefined") {
    this.props.history.push("/")
    }

    if (this.props.state.isDoneFetching) {
      // console.log("Profile",this.props.state.user)
    }
    return(
      <>

      {this.props.state.isDoneFetching ?
        <>

          <Menu style={{marginTop: "0px"}}>
            <Header style={{padding:"10px"}}>Welcome, {this.props.state.user.username}!</Header>
          </Menu>

          {this.props.state.searching ? <Search history={this.props.history}/> : null}


          <Segment raised style={{width:"98%", margin:"10px auto"}}>


          <HouseholdCardsContainer history={this.props.history}
          />
          </Segment>

          <Segment raised style={{width:"98%", margin:"10px auto"}}>
          <MessageContainer
          history={this.props.history}/>
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
    isFetching: () => dispatch({type:"IS_FETCHING"}),
    isDoneFetching: () => dispatch({type:"IS_DONE_FETCHING"})
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