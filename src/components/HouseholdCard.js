import React, { Component, } from 'react'
import { Card, Image } from 'semantic-ui-react'

class HouseholdCard extends Component {
  displaySpaceOverview = () => {
    return this.props.household.spaces.map(space=>{
      return <Card.Content key={space.id}>
        {space.name}
        <Card.Content extra>
        <span># Items</span>
        </Card.Content>
      </Card.Content>
    })
  }

  render(){
    // console.log("HHCARD",this.props.household)
    return(
      <Card color={this.props.household.color} link onClick={()=>this.props.redirectToHousehold(this.props.household.id)}>
        <Card.Content>
          <Image floated='right' size='mini' src={this.props.household.image}/>
          <Card.Header>{this.props.household.name}</Card.Header>
        </Card.Content>
        {this.displaySpaceOverview()}
        <Card.Content extra>
          <span># Users</span>
          <span># Messages</span>
        </Card.Content>
      </Card>
    )
  }
}




export default HouseholdCard

// <Card.Content description={"Space # Items"}/>
// <Card.Content description={
//   <>
//     <div style={{textAlign:"center"}}>Space Name</div>
//     <hr width={"50%"}/>
//     <div style={{textAlign:"center"}}># of Items</div>
//   </>
// }/>
// <Card.Content description={"Space # Items"}/>


// <Card.Content header={this.props.household.name}/>
// <Image floated='right' size="mini" src={this.props.household.image}/>
// {this.displaySpaceOverview()}
// <Card.Content extra>
//   <span># Users</span>
//   <span># Messages</span>
// </Card.Content>