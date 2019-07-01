import React, { Component, } from 'react'
import { Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'



class ItemPage extends Component {

  componentDidMount(){

    fetch(`http://localhost:3000/api/v1/items/${this.props.match.params.id}`,{
      method: "GET",
      headers: { Authorization:  localStorage.getItem("token") }
    })
    .then(resp=>resp.json())
    .then(item=>{
      // console.log(item)
      this.props.setCurrentItem(item)
    })
  }


  renderOwners = () => {
    if (this.props.state.currentItem.users) {
      return this.props.state.currentItem.users.map(user => {
        return <Segment key={user.id}>{user.username}</Segment>
      })
    }
  }

  render(){
    // console.log(this.props.state.currentItem.space.name)
    return(
      <Segment.Group style={{width:"98%"}}>
        <Segment>{this.props.state.currentItem.name}</Segment>
        <Segment></Segment>
        <Segment.Group>
            {this.renderOwners()}
        </Segment.Group>
      </Segment.Group>
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
      setCurrentItem: (item) => dispatch({type:"SET_CURRENT_ITEM", item})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ItemPage)