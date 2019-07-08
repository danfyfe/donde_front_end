import React, { Component, Fragment } from 'react'
import { Segment, Card, List, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'

class SpaceCard extends Component {

  renderContainerDescriptions = () => {
      return this.props.space.containers.map(container => {
        return <Fragment key={container.id}>
        <Card key={container.id} link onClick={()=>this.props.setCurrentContainer(container)} style={{width:"100%"}}>
            <Card.Content header={container.name }/>
            <Card.Content meta={container.description}/>
            <Card.Content extra>
              {container.items.length} Items
            </Card.Content>
        </Card>
        </Fragment>
      })
  }

  renderSpaceItems = () => {
    return this.props.space.items.map(item => {
      return <Segment key={item.id}>
      <List.Item key={item.id}>
      <List.Content>{item.name}</List.Content>
      </List.Item>
      </Segment>
    })
  }

  renderNoContainersMessage = () => {
    return <Message warning>This space has no containers! View this space to add one!</Message>
  }

  setCurrentSpaceAndContainerToNone = (space) => {
    this.props.setCurrentSpace(space)
    this.props.setCurrentContainer({})
  }

  render(){
    // console.log("SPACECARD",this.props.space)
    return(

      <Card link style={{width:"100%"}} onClick={()=>{this.setCurrentSpaceAndContainerToNone(this.props.space)}} >
        <Card.Content header={this.props.space.name}/>
        <Segment>
        {
          this.props.space.containers.length === 0 ? this.renderNoContainersMessage() :
          <Card.Group itemsPerRow={6}>
          {this.renderContainerDescriptions()}
          </Card.Group>
        }
        </Segment>

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


export default connect(mapStateToProps,mapDispatchToProps)(SpaceCard)

// <Card link>
//   <Card.Content header={this.props.space.name}/>
//   <Segment>
//   {this.renderContainerDescriptions()}
//   </Segment>
// </Card>

// <List>
//   {this.renderSpaceItems()}
// </List>

// <Card link onClick={()=>{this.props.setCurrentSpace(this.props.space)}} style={{width:"50%"}}>
//   <Card.Content header={this.props.space.name}/>
//   <Card.Group itemsPerRow={6}>
//   {this.renderContainerDescriptions()}
//   </Card.Group>
//
// </Card>