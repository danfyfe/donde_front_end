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

export function addItem( itemName, itemDescription, containerId, itemOwners ){
  return dispatch => {
    axios({
      method:"POST",
      url: `${apiEndpoint}/items`,
      headers:{
        'Content-Type':'application/json',
        Accept: 'application/json'
      },
      data: {
        item:{
          name: itemName,
          description: itemDescription,
          container_id: containerId
        },
        users_ids: itemOwners
      }
    })
    .then( resp =>{
      return dispatch({type:'ADD_ITEM', payload: resp.data})
    })
  }
};

