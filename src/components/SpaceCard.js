import React from 'react'
// import { Message} from 'semantic-ui-react'
import { connect } from 'react-redux'


const SpaceCard = props => {

  // const renderContainerList = () => {
  //
  //   let containerListItems = props.space.containers.map(container => {
  //     return <List.Item key={container.id}>
  //       {container.name}
  //     </List.Item>
  //   })
  //
  //   return <div className='large-left-padding text-muted small-font'>
  //   <List >
  //     {containerListItems}
  //   </List>
  //   </div>
  // }

  // const renderSpaceItems = () => {
  //   return this.props.space.items.map(item => {
  //     return <Segment key={item.id}>
  //     <List.Item key={item.id}>
  //     <List.Content>{item.name}</List.Content>
  //     </List.Item>
  //     </Segment>
  //   })
  // }

  // const renderNoContainersMessage = () => {
  //   return <Message className='small-font'style={{margin:'0'}} warning>This space has no containers! Click this card to view this space and add one!</Message>
  // }

  const setCurrentSpaceAndContainerToNone = (space) => {
    props.setCurrentSpace(space)
    props.setCurrentContainer({})
  }

  return(
    <div className='df-card' onClick={() => {setCurrentSpaceAndContainerToNone(props.space)}} >
      <span className='font-weight-bold small-padding'>{props.space.name}</span>
      {/*
        <hr style={{margin:'1vh auto'}} width={'85%'}/>
        <div className='d-flex flex-column' style={{margin:'0 2% 2% 2%'}}>
        <span className='font-weight-bold med-padding med-font'>Containers:</span>
        */
      }
        {
          /*props.space.containers.length === 0 ? renderNoContainersMessage() :
          renderContainerList()*/
        }
      </div>
    // </div>
    )
  }

const mapStateToProps = (state) => {
  return {
    state
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    setCurrentSpace: space => dispatch({type:'SET_CURRENT_SPACE', space}),
    setCurrentContainer: container => {
      dispatch({type:"SET_CURRENT_CONTAINER", container})
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(SpaceCard)