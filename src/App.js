import React from 'react';
import { Menu, Dropdown, Icon } from 'semantic-ui-react'
import { Switch, Route } from 'react-router-dom'

import { connect } from 'react-redux'

import './App.css';

import ProfilePage from './pages/ProfilePage.js'
import HomePage from './pages/HomePage.js'
import SignupPage from './pages/SignupPage.js'
import ItemsPage from './pages/ItemsPage.js'
import HouseholdPage from './pages/HouseholdPage.js'
import SpacePage from './pages/SpacePage.js'
import ItemPage from './pages/ItemPage.js'
// import Search from './components/Search.js'

class App extends React.Component {
  handleLogOut = () => {
    localStorage.clear()
    this.props.history.push('/')
  }

  sendToProfilePage = () => {
    if (!localStorage.token || localStorage.token === "undefined") {
    this.props.history.push("/")
    } else {
    this.props.history.push('/profile')
    this.props.setCurrentSpace({})
    this.props.setCurrentContainer({})
    this.props.setSearchingToFalse()
    }
  }

  sendToItemsPage = () => {
    this.props.history.push('/items')
    this.props.setCurrentSpace({})
    this.props.setCurrentContainer({})
    this.props.setSearchingToFalse()
  }


  render(){

    return(
      <>
      {localStorage.token && localStorage.token !== "undefined" ?
        <Menu style={{backgroundColor:"#3d8af7",borderRadius:"0px", marginBottom: "0px"}}>
          <Menu.Item onClick={this.sendToProfilePage} header>
            Donde
          </Menu.Item>
          <Menu.Item onClick={this.props.setSearching} >
            <Icon name="search"/>
          </Menu.Item>
          <Menu.Menu position="right">
          <Dropdown pointing="top right" item text={null} icon="bars">
            <Dropdown.Menu>
              <Dropdown.Item onClick={this.sendToProfilePage}><Icon name="user circle"/>Profile</Dropdown.Item>
              {/*<Dropdown.Item onClick={this.sendToItemsPage}><Icon name="images"/>Items</Dropdown.Item>*/}
              <Dropdown.Item onClick={this.handleLogOut}><Icon name="log out"/>LogOut</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </Menu.Menu>
        </Menu> : null
      }
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
    setCurrentContainer: (container) => dispatch({type:"SET_CURRENT_CONTAINER", container}),
    setSearchingToFalse: () => dispatch({type:"SET_SEARCHING_TO_FALSE"})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);