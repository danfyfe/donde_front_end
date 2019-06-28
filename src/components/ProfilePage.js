import React, { Component, } from 'react'
import { Segment, Header, Menu } from 'semantic-ui-react'
import HouseholdCardsContainer from './HouseholdCardsContainer.js'
import MessageContainer from './MessageContainer.js'
// import withAuth from '../hocs/withAuth'

class ProfilePage extends Component {
  state = {
    userData: {},
    // households:[],
    // addingHousehold: false,
    // householdName: "",
    // householdPass: "",
    // householdColor: ""
  }

  componentDidMount(){
    fetch('http://localhost:3000/api/v1/profile',{
      method:"POST",
      headers: { Authorization:  localStorage.getItem("token") }
    }).then(resp=>resp.json())
    .then(user=>{
      // console.log("Profile!!", data)
      this.setState({
        userData: user
      })
    })
  }


  render(){
    // console.log(store)
    // console.log("PROF STATE",this.state.userData.user)
    // console.log("PROF PROPS",this.props)
    if (!localStorage.token || localStorage.token === "undefined") {
    this.props.history.push("/")
    }

    return(
      <>
        <Menu style={{marginTop: "0px"}}>
          <Header style={{padding:"10px"}}>Welcome User !</Header>
        </Menu>



          <HouseholdCardsContainer
          user={this.state.userData.user} history={this.props.history} households={this.state.households}/>


          <Segment>


            <MessageContainer  user={this.state.userData.user}
            history={this.props.history}/>

          </Segment>


      </>
    )
  }

// mapStateToProps = () => {
//
// }
//
// mapDispatchToProps = (dispatch) =>{
//   return {dispatch}
// }



}

export default ProfilePage




  // <Dropdown placeholder="Color" name="househholdColor" search selection options={householdColorOptions} onSelect={this.handleHouseholdInput}/>