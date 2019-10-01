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

export function removeOwner(itemId, userId){
  axios({
    method:"DELETE",
    url: `${apiEndpoint}/items/owners/${itemId}/${userId}`,
    headers:{
      'Content-Type':'application/json',
      Accept: 'application/json',
      Authorization:  localStorage.getItem("token"),
      Allow: 'DELETE'
    },
    data: {
      item:{
        id: itemId
      },
      user_id: userId
    }
  }).then( resp =>{
    

  })
}


export function deleteItem(itemId){
  axios({
    method:"DELETE",
    url: `${apiEndpoint}/items/${this.props.item.id}`,
    headers: {
      'Content-Type':'application/json',
      Accept: 'application/json',
      Authorization:  localStorage.getItem("token")
    },
    data: {
      householdPassword: this.state.householdPassword,
      userId: this.props.user.id
    }
  }).then( resp => {


  })
}

export function moveItem(itemId){
  axios({
    method:"PATCH",
    url: `${apiEndpoint}/items/${this.props.item.id}`,
    headers:{
      'Content-Type':'application/json',
      Accept: 'application/json',
      Authorization:  localStorage.getItem("token")
    },
    data: {
      item:{
        household_id: this.state.itemHousehold_id,
        space_id: this.state.itemSpace_id,
        container_id: this.state.itemContainer_id,
        id: this.props.item.id,
        name: this.state.itemName,
        description: this.state.itemDescription
      },
      user_id: this.props.user.id
    }
  })
  .then( resp  => {

  })
}



