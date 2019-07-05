import React from 'react';
import { Menu, Dropdown, Icon, Modal } from 'semantic-ui-react'
import { Switch, Route } from 'react-router-dom'

import { connect } from 'react-redux'

import './App.css';

import ProfilePage from './components/ProfilePage.js'
import HomePage from './components/HomePage.js'
import SignupPage from './components/SignupPage.js'
import ItemsPage from './components/ItemsPage.js'
import HouseholdPage from './components/HouseholdPage.js'
import SpacePage from './components/SpacePage.js'
import ItemPage from './components/ItemPage.js'
import Search from './components/Search.js'

// import Search from './components/Search.js'

class App extends React.Component {
  //  main dropdown menu functions
  handleLogOut = () => {
    localStorage.clear()
    this.props.history.push('/')
  }

  sendToProfilePage = () => {
    this.props.history.push('/profile')
    this.props.setCurrentSpace({})
    this.props.setCurrentContainer({})
  }

  sendToItemsPage = () => {
    this.props.history.push('/items')
    this.props.setCurrentSpace({})
    this.props.setCurrentContainer({})
  }


  render(){
    // (console.log('APP PROPS state',this.props.state))
    return(
      <>
        <Menu style={{backgroundColor:"#3d8af7",borderRadius:"0px", marginBottom: "0px"}}>
          <Menu.Item header>
              ¿
          </Menu.Item>
          <Menu.Item onClick={this.sendToProfilePage} header>
            Don¿e
          </Menu.Item>
          <Menu.Item onClick={this.props.setSearching} >
            <Icon name="search"/>
          </Menu.Item>
          <Menu.Menu position="right">
          <Dropdown pointing="top right" item text={null} icon="bars">
            <Dropdown.Menu>
              <Dropdown.Item onClick={this.sendToProfilePage}><Icon name="user circle"/>Profile</Dropdown.Item>
              <Dropdown.Item onClick={this.sendToItemsPage}><Icon name="images"/>Items</Dropdown.Item>
              <Dropdown.Item onClick={this.handleLogOut}><Icon name="log out"/>LogOut</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </Menu.Menu>
        </Menu>

        <Modal>
          <Search />
        </Modal>

        <Switch>
          <Route exact path="/" render={({ history }) => <HomePage history={history} /> } />
          <Route path="/profile" render={({history}) => <ProfilePage history={history} />} />
          <Route path="/signup" render={({history}) => <SignupPage history={history} />} />
          <Route path='/households/:id' render={props=><HouseholdPage {...props}/>} />
          <Route path='/items/:id' render={props=><ItemPage {...props} />} />
          <Route path='/items' render={props=><ItemsPage {...props}/>}/>
          <Route path='/spaces/:id' render={props=><SpacePage {...props}/>}/>
        </Switch>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return { state }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSearching: ()=> dispatch({type:"SET_SEARCHING"}),
    setCurrentSpace: (space) => dispatch({type:"SET_CURRENT_SPACE"}),
    setCurrentContainer: (container) => {
      dispatch({type:"SET_CURRENT_CONTAINER", container})
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);

// <Dropdown trigger ={dropdownTrigger}options={dropdownOptions} pointing="top right" icon={null}/>