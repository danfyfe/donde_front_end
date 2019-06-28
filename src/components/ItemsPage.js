import React, { Component, } from 'react'
import { Segment} from 'semantic-ui-react'
import {connect} from 'react-redux'
class ItemsPage extends Component {

  componentDidMount(){

  }

  render(){
    console.log("ITEMS PAGE",this.props.state)
    return(
      <Segment>
        ITEMS PAGE
      </Segment>
    )
  }

}


const mapStateToProps = (state) => {
  return { state }
}

export default connect(mapStateToProps)(ItemsPage)