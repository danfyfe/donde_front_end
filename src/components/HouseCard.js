import React, { Component, } from 'react'
import { Segment, Form, Message, Button, Header, Menu, Card } from 'semantic-ui-react'

class HouseCard extends Component {
  render(){
    return(
      <Card color="blue">
        <Card.Content header="Household Name"/>
        <Card.Content description={"Space # Items"}/>
        <Card.Content description={
          <>
            <div style={{textAlign:"center"}}>Space Name</div>
            <hr width={"50%"}/>
            <div style={{textAlign:"center"}}># of Items</div>
          </>
        }/>
        <Card.Content description={"Space # Items"}/>
        <Card.Content extra>
          <span># Users</span>
          <span># Messages</span>
        </Card.Content>
      </Card>
    )
  }
}




export default HouseCard