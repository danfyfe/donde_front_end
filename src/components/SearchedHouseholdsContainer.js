import React, { Component, } from 'react'
import { Segment, Card, Button, Form } from 'semantic-ui-react'

import HouseholdCard from './HouseholdCard.js'

class SearchedHouseholdsContainer extends Component {

  redirectToHousehold = (id) => {
    this.props.history.push(`/households/${id}`)
  }

  renderSearchedHouseholds = () => {
    let filteredHouseholds = this.props.households.filter(household => {
      // console.log(household)
      return (household.name.toLowerCase().includes(this.props.searchTerm.toLowerCase()) )
    })
    // console.log(this.props.households)
    // console.log('filteredHouseholds',filteredHouseholds)

    if (filteredHouseholds.length === this.props.households.length) {
    return null
    }else {
    return filteredHouseholds.map(household => {
      return <HouseholdCard history={this.props.history} redirectToHousehold={this.redirectToHousehold} household={household}/>
    })
    }
  }

  render(){
    // console.log('search term by props',this.props.searchTerm)
    return(
      <Segment>
      {this.renderSearchedHouseholds() }
      </Segment>
    )
  }
}



export default SearchedHouseholdsContainer