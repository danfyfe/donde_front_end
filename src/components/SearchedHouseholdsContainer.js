import React, { Component, } from 'react'
import { Segment, Card } from 'semantic-ui-react'
import { connect } from 'react-redux'

import HouseholdCard from './HouseholdCard.js'

class SearchedHouseholdsContainer extends Component {

  redirectToHousehold = (id) => {
    console.log('inside redirect to household')
    this.props.setSearchingToFalse()
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
      return <HouseholdCard key={household.id} history={this.props.history} redirectToHousehold={this.redirectToHousehold} household={household}/>
    })
    }
  }

  render(){
    // console.log('search term by props',this.props.searchTerm)
    return(
      <Segment>
        <Card.Group itemsPerRow={6}>
        {this.renderSearchedHouseholds() }
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
    setSearchingToFalse: () => dispatch({type:"SET_SEARCHING_TO_FALSE"})
  }
}



export default connect(mapStateToProps,mapDispatchToProps)(SearchedHouseholdsContainer)