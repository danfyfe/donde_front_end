import React, { Component, } from 'react'
import { Card } from 'semantic-ui-react'
import { connect } from 'react-redux'

class ItemCard extends Component {
  state = {
    editingItem: false
  }

  renderOwners = () => {
    return this.props.item.users.map(user => {
      return <span key={user.id} style={{padding:"0 4px 0 0"}}>{user.username}</span>
    })
  }


  render(){

    return(
      <>

      <Card link style={{margin:"1% auto", height:"100%",width:"100%"}} onClick={()=>this.props.redirectToItemPage(this.props.item)}>
        <Card.Content header={this.props.item.name}/>


        <Card.Content meta={this.props.item.space.name + " :: " + this.props.item.container.name}/>
        <Card.Content description={this.props.item.description}/>
        <Card.Content extra>
          Owners: {this.renderOwners()}
        </Card.Content>
      </Card>
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
      setHouseholds: (households) => dispatch({type:"SET_HOUSEHOLDS", households}),
      addHousehold: (household) => dispatch({type:"ADD_HOUSEHOLD", household}),
      setUserHouseholdMessages: (allMessages) => dispatch({type:"SET_USERHOUSEHOLDMESSAGES", allMessages}),
      addMessage: (message) => dispatch({type:"ADD_MESSAGE", message}),
      setSearchingToFalse: () => dispatch({type:'SET_SEARCHING_TO_FALSE'})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ItemCard)


