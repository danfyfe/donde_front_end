import React, { Component, } from 'react'
import { Segment, Card } from 'semantic-ui-react'
import { connect } from 'react-redux'

import ItemCard from './ItemCard.js'

class SearchedItemsContainer extends Component {

  renderSearchedItems = () => {
    let filteredItems = this.props.items.filter(item => {
      // console.log(item)
      return (item.name.toLowerCase().includes(this.props.searchTerm.toLowerCase()) || item.description.toLowerCase().includes(this.props.searchTerm.toLowerCase()))
    })
    // console.log(this.props.items)
    // console.log('filteredItems',filteredItems)

    if (filteredItems.length === this.props.items.length) {
    return null
    }else {
    return filteredItems.map(item => {
      // console.log(item)
      return <ItemCard redirectToItemPage={this.redirectToItemPage} key={item.id} history={this.props.history} item={item}/>
    })
    }
  }

  redirectToItemPage = (id) => {
    this.props.setSearchingToFalse()
    this.props.history.push(`/items/${id}`)
  }

  render(){
    // console.log('search term by props',this.props.searchTerm)
    return(
      <Segment>
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
    setSearchingToFalse: () => dispatch({type:"SET_SEARCHING_TO_FALSE"})
    }
  }



export default connect(mapStateToProps,mapDispatchToProps)(SearchedItemsContainer)