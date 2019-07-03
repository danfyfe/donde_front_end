import React, { Component } from 'react'
import { Segment, Card, List, Icon, Header, Menu, Form, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'

import ItemCard from './ItemCard.js'


class Container extends Component {

  renderItemCards = () => {
    if (this.props.container.items) {
      return this.props.container.items.map(item => {
        return <ItemCard item={item}/>
      })
    }
  }


  render(){
    console.log(this.props.container.items)
    return(
      <Segment>

          <Header size="medium">{this.props.container.name}</Header>
          <Card.Group>
            {this.renderItemCards()}
          </Card.Group>

      </Segment>
    )
  }
}




const mapStateToProps = (state) => {
  return { state }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    setUser: (user) => dispatch({type:"SET_USER", user}),
    setCurrentHousehold: (household) => dispatch({type:"SET_CURRENT_HOUSEHOLD", household}),
    addSpace: (space) => dispatch({type:"ADD_SPACE", space}),
    setCurrentSpace: (space) => dispatch({type:"SET_CURRENT_SPACE"})
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Container)