import React, { Component } from 'react'
import { Segment, Card } from 'semantic-ui-react'
import { connect } from 'react-redux'

import HouseholdCard from '../components/HouseholdCard.js'

class SearchedHouseholdsContainer extends Component {

  redirectToHousehold = (householdId) => {
    this.props.setSearchingToFalse()

    this.props.history.push(`/households/${householdId}`)

    this.props.setCurrentHousehold(householdId)

  }

  renderSearchedHouseholds = () => {
    let filteredHouseholds = this.props.households.filter(household => {

      return (household.name.toLowerCase().includes(this.props.searchTerm.toLowerCase()) )
    })

    if (filteredHouseholds.length === this.props.households.length) {
    return null
    }else {
    return filteredHouseholds.map(household => {
      return <HouseholdCard key={household.id} history={this.props.history} redirectToHousehold={this.redirectToHousehold} household={household}/>
    })
    }
  }

  render(){

    return(
      <Segment>
        <Card.Group itemsPerRow={6}>
        {this.renderSearchedHouseholds()}
        </Card.Group>
      </Segment>
    )
  }
}

const mapStateToProps = (state) => {
  return { state }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSearching: ()=> dispatch({type:"SET_SEARCHING"}),
    setCurrentSpace: (space) => dispatch({type:"SET_CURRENT_SPACE"}),
    setCurrentContainer: (container) => dispatch({type:"SET_CURRENT_CONTAINER", container}),
    setSearchingToFalse: () => dispatch({type:"SET_SEARCHING_TO_FALSE"}),
    setCurrentHousehold: (household) => dispatch({type:"SET_CURRENT_HOUSEHOLD", household})
  }
}



export default connect(mapStateToProps,mapDispatchToProps)(SearchedHouseholdsContainer)