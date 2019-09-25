import React, { Component } from 'react'
import { Segment, Form, Message, Button, Dropdown, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'

import HouseholdCard from '../components/HouseholdCard.js'
import AddHouseholdForm from '../components/forms/households/AddHouseholdForm.js'

// let API_ENDPOINT
// if (process.env.NODE_ENV === 'production') {
//   API_ENDPOINT = 'https://df-donde-api.herokuapp.com'
// } else {
//   API_ENDPOINT = 'http://localhost:3000'
// }

class HouseholdCardsContainer extends Component {
  state = {
    addingHousehold: false
  }

  setAddingHousehold = () => {
    this.setState({
      addingHousehold: !this.state.addingHousehold
    })
  }
  
  renderAddHouseholdHeader = () => {
    return <>
    <span className='font-weight-bold larger-text' style={{height:'1vh'}}>Households</span>
    <Icon onClick={this.setAddingHousehold} name='plus'/>
    </>
  }

  renderHouseholdCards = () => {
    if (this.props.state.isDoneFetching) {
      if (this.props.state.user.households.length === 0) {
        return <Message size="small" compact style={{margin:"2% auto"}}>You do not currently belong to any households! You can create a household by clicking 'Add Household', or use the Search Icon above to search for a household to join</Message>
      } else {
        return this.props.state.user.households.map(household=>{
          return <HouseholdCard key={household.id} household={household}
          redirectToHousehold={this.redirectToHousehold}/>
        })
      }
    }
  }

  redirectToHousehold = (household) => {
    this.props.history.push(`/households/${household.id}`)
  }

  render(){

    return(
      <>
      <div className='d-flex justify-content-between full-width'>

        { this.state.addingHousehold ?
          <AddHouseholdForm userId={this.props.state.user.id} setAddingHousehold={this.setAddingHousehold}
          addHousehold={this.props.addHousehold}/> : <> {this.renderAddHouseholdHeader()}</>
        }
      </div>

      <div className='d-flex flex-column' style={{marginTop:'3vh'}}>
        {this.renderHouseholdCards()}
      </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return { state }
}


const mapDispatchToProps = (dispatch) => {
    return {
      setUser: (user) => dispatch({type:"SET_USER", user}),
      setHouseholds: (households) => dispatch({type:"SET_HOUSEHOLDS",households}),
      addHousehold: (household) => dispatch({type:"ADD_HOUSEHOLD", household}),
      setCurrentHousehold: (household) => dispatch({type:"SET_CURRENT_HOUSEHOLD", household})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(HouseholdCardsContainer)