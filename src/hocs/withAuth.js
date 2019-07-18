import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { fetchCurrentUser } from '../actions/user'
import { Loader } from 'semantic-ui-react'

const withAuth = (WrappedComponent) => {
  class AuthorizedComponent extends React.Component {
    componentDidMount() {
      if (localStorage.getItem('token') && !this.props.loggedIn) this.props.fetchCurrentUser()
    }

    render() {

      if (localStorage.getItem('token') && this.props.loggedIn) {

        return <WrappedComponent />
      } else if (localStorage.getItem('token') && (this.props.authenticatingUser || !this.props.loggedIn)) {

        return <Loader style={{margin: "400px auto"}} active inline="centered" />
      } else {

        return <Redirect to="/" />
      }
    }
  }

  const mapStateToProps = (reduxStoreState) => {
    return {
      loggedIn: reduxStoreState.usersReducer.loggedIn,
      authenticatingUser: reduxStoreState.usersReducer.authenticatingUser
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      fetchCurrentUser: () => dispatch(fetchCurrentUser())
    }
  }

  return connect(
    mapStateToProps,
    { fetchCurrentUser }
  )(AuthorizedComponent)
}

export default withAuth
