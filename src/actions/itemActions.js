import apiEndpoint from './ApiEndpoint.js';

const axios = require('axios');

export function getItem(itemId) {
  return dispatch => {
    axios({
      method: "GET",
      url: `${apiEndpoint}/items/${itemId}`,
      headers: { Authorization:  localStorage.getItem("token") }
    })
    .then( resp =>{
      // console.log(resp)
        return dispatch({type:'SET_CURRENT_ITEM', payload: resp.data})
    })
  }
};

