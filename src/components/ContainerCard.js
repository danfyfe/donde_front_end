import React, { Component } from 'react'
import { Segment, Card, List } from 'semantic-ui-react'
import { connect } from 'react-redux'

class ContainerCard extends Component {


  renderContainerItems = () => {
    return this.props.container.items.map(item => {
      return <Segment style={{margin:"5px"}}>
      <List.Item >
        <List.Content>{item.name}</List.Content>
      </List.Item>
      </Segment>
    })
  }


  render(){
    // console.log(this.props.container)
    // console.log('current container',this.props.state.currentContainer)
    return(
      <Card link onClick={()=>this.props.setCurrentContainer(this.props.container)}>
        <Card.Content>
          <Card.Header>{this.props.container.name}</Card.Header>
          <Card.Meta>{this.props.container.description}</Card.Meta>
        </Card.Content>

        <List>
          {this.renderContainerItems()}
        </List>

      </Card>
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
    setCurrentSpace: (space) => dispatch({type:"SET_CURRENT_SPACE", space}),
    setCurrentContainer: (container) => {
      dispatch({type:"SET_CURRENT_CONTAINER", container})
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ContainerCard)

