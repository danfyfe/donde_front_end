import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'

import HouseholdCard from './HouseholdCard.js'

class HouseholdCardsContainer extends Component {
  renderHouseholdCards = () => {
    return this.props.households.map(household=>{
      console.log(household)
      return <HouseholdCard key={household.id} redirectToHousehold={this.redirectToHousehold} household={household}/>
    })
  }

  redirectToHousehold = (id) => {
    // console.log(id)
    this.props.history.push(`/housholds/${id}`)
  }

  render(){
    // console.log("HHCARDCONT",this.props)
    return(
      <Card.Group>
        {this.renderHouseholdCards()}
      </Card.Group>
    )
  }
}

export default HouseholdCardsContainer