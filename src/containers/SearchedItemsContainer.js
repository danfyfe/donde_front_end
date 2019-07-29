import React, { Component, } from 'react'
import { Segment, Card } from 'semantic-ui-react'
import { connect } from 'react-redux'

import ItemCard from '../components/ItemCard.js'

class SearchedItemsContainer extends Component {

  renderSearchedItems = () => {
    const userHouseholdItems = this.props.state.user.households.map(household => {
      return household.items
    }).flat()
    // console.log(userHouseholdItems)
    let filteredItems = userHouseholdItems.filter(item => {
      return (item.name.toLowerCase().includes(this.props.searchTerm.toLowerCase()) || item.description.toLowerCase().includes(this.props.searchTerm.toLowerCase()))
    })

    if (filteredItems.length === 0) {
      return null
    } else {
    return filteredItems.map(item => {
      return <ItemCard redirectToItemPage={this.redirectToItemPage} key={item.id} history={this.props.history} item={item}/>
    })
    }
  }

  redirectToItemPage = (item) => {
    this.props.setSearchingToFalse()
    this.props.history.push(`/items/${item.id}`)
    this.props.setCurrentItem(item)
  }

  render(){

    return(
      <Segment>
      {/* render items if only a small amount? - toggle showing items with button or something*/}
        <Card.Group itemsPerRow={8}>
        {this.renderSearchedItems() }
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
    setCurrentItem: (item) => dispatch({type:"SET_CURRENT_ITEM", item})
    }
  }



export default connect(mapStateToProps,mapDispatchToProps)(SearchedItemsContainer)