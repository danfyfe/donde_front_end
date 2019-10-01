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

export function editItem( itemId, itemName, itemDescription, containerId ){

  return dispatch => {
    axios({
      method:"PATCH",
      url: `${apiEndpoint}/items/edit/${itemId}`,
      headers:{
        'Content-Type':'application/json',
        Accept: 'application/json'
      },
      data: {
        item:{
          name: itemName,
          description: itemDescription,
          container_id: containerId
        }
      }
    })
    .then( resp =>{
      return dispatch({type:'EDIT_ITEM', payload: resp.data})
    })
  }
}

export function addOwners(itemId, owners){
  return dispatch => {
    axios({
      method:"PATCH",
      url: `${apiEndpoint}/items/owners/${itemId}`,
      headers: {
        'Content-Type':'application/json',
        Accept: 'application/json',
        Authorization:  localStorage.getItem("token")
      },
      data: {
        users_ids: owners
      }
    })
    .then( resp =>{
      return dispatch({type:'ADD_OWNERS', payload: resp.data})
    })
  }
}



