import React from 'react';
import { Menu } from 'semantic-ui-react'
import { Switch, Route } from 'react-router-dom'
import './App.css';
import ProfilePage from './components/ProfilePage.js'
import HomePage from './components/HomePage.js'
import SignupPage from './components/SignupPage.js'

class App extends React.Component {
  render(){
    return(
      <>
        <Menu style={{backgroundColor:"#0585E8",borderRadius:"0px"}}>
          <Menu.Item header>
          </Menu.Item>
        </Menu>
        <Switch>
          <Route exact path="/" render={({ history }) => <HomePage history={history} /> } />
          <Route path="/profile" render={({history}) => <ProfilePage history={history} />} />
          <Route path="/signup" render={({history}) => <SignupPage history={history} />} />
        </Switch>
      </>
    )
  }
}
export default App;
