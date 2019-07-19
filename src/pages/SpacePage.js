//  not currently being used
//
//
// import React, { Component, } from 'react'
// import { Segment } from 'semantic-ui-react'
// import { connect } from 'react-redux'
//
// import HouseholdMessagesContainer from '../containers/HouseholdMessagesContainer.js'
//
// class SpacePage extends Component {
//
//   state = {
//     currentSpace: {}
//   }
//   componentDidMount(){
//     fetch('http://localhost:3000/api/v1/profile',{
//       method:"POST",
//       headers: { Authorization:  localStorage.getItem("token") }
//     }).then(resp=>resp.json())
//     .then(user=>{
//       this.props.setUser(user.user)
//     }).then(
//     fetch(`http://localhost:3000/api/v1/spaces/${this.props.match.params.id}`,{
//       method: "GET",
//       headers: { Authorization:  localStorage.getItem("token") }
//     })
//     .then(resp=>resp.json())
//     .then(space=>{
//
//       this.props.setCurrentSpace(space)
//
//     })
//   )
//   }
//
//
//   render(){
//     console.log('CURRENT SPACE',this.props.state.currentSpace)
//     return(
//       <Segment>
//
//       <HouseholdMessagesContainer household={this.props.state.currentHousehold}/>
//       </Segment>
//     )
//   }
// }
//
// const mapStateToProps = (state) => {
//   return { state }
// }
//
// const mapDispatchToProps = (dispatch) =>{
//   return {
//     setUser: (user) => dispatch({type:"SET_USER", user}),
//     setCurrentHousehold: (household) => dispatch({type:"SET_CURRENT_HOUSEHOLD", household}),
//     addSpace: (space) => dispatch({type:"ADD_SPACE", space}),
//     setCurrentSpace: (space) => {
//       dispatch({type:"SET_CURRENT_SPACE", space})
//     }
//   }
// }
//
//
// export default connect(mapStateToProps,mapDispatchToProps)(SpacePage)