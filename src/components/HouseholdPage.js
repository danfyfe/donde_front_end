import React, { Component, } from 'react'
import { Segment, Menu, Header} from 'semantic-ui-react'
import HouseholdContainer from './HouseholdContainer.js'
import HouseholdMessagesContainer from './HouseholdMessagesContainer.js'
class HouseholdPage extends Component {
  state = {
    household: {}
  }

  componentDidMount(){
    fetch(`http://localhost:3000/api/v1/households/${this.props.match.params.id}`,{
      method: "GET",
      headers: { Authorization:  localStorage.getItem("token") }
    })
    .then(resp=>resp.json())
    .then(household=>{
      // console.log("HOUSEHOLD",household)
      this.setState({
        household: household
      })
    })
  }

  render(){
    // console.log("Household PORPS",this.props)
    // console.log("Household STATE", this.state.household)
    return(
      <>
        <Menu style={{marginTop: "0px"}}>
          <Header style={{padding:"10px"}}>USER!</Header>
        </Menu>
        <Segment raised style={{margin:"10px auto",width:"98%"}}>
          <HouseholdContainer/>
          <HouseholdMessagesContainer household={this.state.household}/>
        </Segment>
      </>
    )
  }

}

export default HouseholdPage