import React from 'react'
import { Icon, Message, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'



function Loading() {
    return(
      <Segment style={{width:'50%', margin:'10vh auto'}}>
          <div className='d-flex flex-column'>
              <Icon loading size="massive" name="question" style={{margin:'auto'}}/>

              <Message style={{margin:'5vh auto 0 auto'}}>Loading...</Message>
          </div>
      </Segment>
    )
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