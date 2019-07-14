import React, { Component, } from 'react'
import { Card, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'

class HouseholdCard extends Component {

  render(){

    return(
      <Card color={this.props.household.color} link style={{width:"100%"}} onClick={()=>this.props.redirectToHousehold(this.props.household)}>
        <Card.Content>
          <Image floated='right' size='mini' src={this.props.household.image}/>
          <Card.Header>{this.props.household.name}</Card.Header>
        </Card.Content>
        {this.displaySpaceOverview()}
        <Card.Content extra>
          <span style={{paddingRight:"5px"}}>{this.props.household.users.length} Users</span>
          <span>{this.props.household.messages.length} Messages</span>
        </Card.Content>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return { state }
}

const mapDispatchToProps = (dispatch) => {
  return {
  setSearchingToFalse: () => dispatch({type:'SET_SEARCHING_TO_FALSE'})
 }
}


export default connect(mapStateToProps, mapDispatchToProps)(HouseholdCard)
