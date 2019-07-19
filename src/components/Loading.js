import React from 'react'
import { Icon, Message, Segment, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'



function Loading() {
    return(
      <Segment style={{margin:"5% 42%"}}>
        <Grid>
          <Grid.Row>
              <Icon loading size="massive" name="question" style={{margin:"25% 25%"}}/>
          </Grid.Row>
          <Grid.Row>
              <Message style={{margin:'auto'}}>Loading...</Message>
          </Grid.Row>
        </Grid>
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