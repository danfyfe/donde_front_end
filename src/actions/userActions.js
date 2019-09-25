import apiEndpoint from './ApiEndpoint.js';

const axios = require('axios');

export function getUser(){
  return(dispatch) => {
    axios({
      method: 'POST',
      url: `${apiEndpoint}/profile`,
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }).then( resp => {
      return dispatch({ type:'SET_USER', payload: resp.data.user })
    });
  }
};
