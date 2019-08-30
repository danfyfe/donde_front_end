import React, { Component, Fragment } from 'react'
import { Segment, Card, List, Message, Header, Button, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'


let API_ENDPOINT
if (process.env.NODE_ENV === 'production') {
  API_ENDPOINT = 'https://df-donde-api.herokuapp.com'
} else {
  API_ENDPOINT = 'http://localhost:3000'
}

class SpaceCard extends Component {

  state = {
    editing: false,
    spaceName: this.props.space.name,
    deleting: false,
    householdPassword: ""
  }

  setEditing = () => {
    this.setState({
      editing: !this.state.editing
    })
  }

  setDeleting = () => {
    this.setState({
      deleting: !this.state.deleting
    })
  }

  renderContainerDescriptions = () => {
      return this.props.space.containers.map(container => {
        return <Fragment key={container.id}>
        <Card key={container.id} style={{width:"25%"}} onClick={() => this.props.setCurrentContainer(container)}>
            <Card.Content header={container.name }/>
            <Card.Content meta={container.description}/>
            <Card.Content extra>
              {container.items.length} Items
            </Card.Content>
        </Card>
        </Fragment>
      })
  }

  renderContainerList = () => {
    let containerListItems = this.props.space.containers.map(container => {
      return <List.Item key={container.id}>
        {container.name}
      </List.Item>
    })
    return <List>
      {containerListItems}
    </List>
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
    return <Message warning>This space has no containers! Click this card to view this space and add one!</Message>
  }

  setCurrentSpaceAndContainerToNone = (space) => {
    this.props.setCurrentSpace(space)
    this.props.setCurrentContainer({})
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  renderEditSpaceForm = () => {
    return <Segment clearing>
    <Form>
      <Form.Field>
        <label>Space Name</label>
        <input onChange={this.handleInput} placeholder="Space name" name="spaceName" value={this.state.spaceName}/>
      </Form.Field>
      <Button floated="right" size="mini" onClick={this.setEditing}>Cancel</Button>
      <Button floated="right" size="mini" onClick={this.editSpace}>Submit</Button>
    </Form>
    </Segment>
  }

  renderDeleteSpaceForm = () => {
    return <Segment clearing>
      <Form>
        <Form.Field>
          <label>Household Password</label>
          <input onChange={this.handleInput} placeholder="Please enter household password" name="houesholdPassword" />
        </Form.Field>
        <Button floated="right" size="mini" onClick={this.setDeleting}>Cancel</Button>
        <Button floated="right" size="mini" color="red" type="password" onClick={this.deleteSpace}>Delete Space</Button>
      </Form>
    </Segment>
  }

  renderEditSpaceHeader = () => {
    return <Button floated="right" size="mini" onClick={this.setEditing}>Edit Space</Button>
  }

  renderDeleteSpaceHeader = () => {
    return <Button floated="right" color="red" size="mini" onClick={this.setDeleting}>Delete Space</Button>
  }

  editSpace = () => {
    fetch(`${API_ENDPOINT}/api/v1/spaces/${this.props.space.id}`,{
      method:"PATCH",
      headers:{
        'Content-Type':'application/json',
        Accept: 'application/json'
      },
      body:JSON.stringify({
        space:{
          name: this.state.spaceName,
          household_id: this.props.state.currentHousehold.id
        },
        space_id: this.props.space.id,
      })
    }).then(resp=>resp.json())
    .then(space=>{
      this.setState({
        addingSpace: !this.state.addingSpace
      })
      this.props.addSpace(space)
    })
  }

  deleteSpace = () => {
    // didnt have time -- todo
  }

  render(){

    return(


      <Card link style={{width:"100%"}} onClick={() => {this.setCurrentSpaceAndContainerToNone(this.props.space)}} >
        <Card.Content header={this.props.space.name}  />

        <Segment>
        <Header as="h4">Containers:</Header>
          {
            this.props.space.containers.length === 0 ? this.renderNoContainersMessage() :
            this.renderContainerList()
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