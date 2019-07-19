// not being used - will eventually utilize

// export const loginUser = (username, password) => {
//   return (dispatch) => {
//
//     dispatch({ type: 'AUTHENTICATING_USER' })
//
//     fetch(`http://localhost:3000/api/v1/login`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json'
//       },
//       body: JSON.stringify({
//         user: {
//           username: username,
//           password: password
//         }
//       })
//     })
//       .then(response => {
//         console.log(response)
//         if (response.ok) {
//           return response.json()
//         } else {
//           throw response
//         }
//       })
//
//       .then(JSONResponse => {
//
//         localStorage.setItem('token', JSONResponse.jwt)
//         dispatch({ type: 'SET_CURRENT_USER', payload: JSONResponse.user })
//
//       })
//       .catch(r => r.json().then(e => dispatch({ type: 'FAILED_LOGIN', payload: e.message })))
//
//   }
// }
//
// export const fetchCurrentUser = () => {
//   return (dispatch) => {
//     dispatch(authenticatingUser()) //tells the app we are fetching
//     fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/profile`, {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`
//       }
//     })
//       .then(response => response.json())
//       .then((JSONResponse) => dispatch(setCurrentUser(JSONResponse.user)))
//   }
// }
//
// export const setCurrentUser = (userData) => ({
//   type: 'SET_CURRENT_USER',
//   payload: userData
// })
//
// export const failedLogin = (errorMsg) => ({
//   type: 'FAILED_LOGIN',
//   payload: errorMsg
// })
//
//
// export const authenticatingUser = () => ({ type: 'AUTHENTICATING_USER' })
//
//
// export const setHousehold = () => ({
//   type: 'SET_HOUSEHOLD'
// })