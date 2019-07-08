import React, { Component } from 'react'
import { Icon, Message, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'



class Loading extends Component {
  render(){
    return(
      <Segment style={{margin:"5% 42%"}}>
        <Icon loading size="massive" name="question" style={{margin:"25% 20%"}}/>
        <Message>Loading...</Message>
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
    isFetching: () => dispatch({type:"IS_FETCHING"}),
    isDoneFetching: () => dispatch({type:"IS_DONE_FETCHING"})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Loading)