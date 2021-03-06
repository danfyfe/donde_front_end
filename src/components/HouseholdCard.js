import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'

function HouseholdCard(props) {
    return(
      <Card color={props.household.color} link style={{width:"100%"}} onClick={()=>props.redirectToHousehold(props.household.id)}>
        <Card.Content>
          <Image floated='right' size='mini' style={{height:'30px', width: '30px'}} src={props.household.image}/>
          <Card.Header>{props.household.name}</Card.Header>
        </Card.Content>
        <Card.Content extra>
          <span style={{paddingRight:"5px"}}>{props.household.users.length} Users</span>
          <span>{props.household.messages.length} Messages</span>
        </Card.Content>
      </Card>
    )
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
