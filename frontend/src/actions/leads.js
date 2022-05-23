import axios from 'axios'
import {GET_PRODUCTS, DELETE_LEAD,ADD_PRODUCT,EDIT_PRODUCT,BUY_PRODUCT,GET_COINS,EDIT_COIN } from './types'
import {createMessage, returnErrors} from './messages'
import { configHeader } from './auth'
// get leads action

export const getProducts = () => (dispatch,getState) =>{
    axios.get('/products/view',configHeader(getState))
        .then(res=>{
            dispatch({
                type:GET_PRODUCTS,
                payload:res.data
            })
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

// Deletes a user
export const deleteLead = (id) => (dispatch,getState) =>{
    axios.delete(`/api/leads/${id}/`,configHeader(getState))
        .then(res=>{
            dispatch(createMessage({leadDeleted:'Lead Deleted'}))
            dispatch({
                type:DELETE_LEAD,
                payload:id
            })
        })
        .catch(err => console.log(err))
}

// Add a product
export const addProduct = (product) => (dispatch,getState) =>{
    axios.post("/products/create", product,configHeader(getState))
        .then(res=>{
            dispatch(createMessage({leadAdded:'Product Added Successfully'}))
            dispatch({
                type:ADD_PRODUCT,
                payload:res.data
            })
        })
        // returnErrors from thee action
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

// Edit a product
export const updateProduct = (product) => (dispatch,getState) =>{
    axios.put("/products/update", product,configHeader(getState))
        .then(res=>{
            dispatch(createMessage({leadAdded:'Product Updated Successfully'}))
            dispatch({
                type:EDIT_PRODUCT,
                payload:res.data
            })
        })
        // returnErrors from thee action
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
        })
}

// Buy a product
export const buyProduct = (product) => (dispatch,getState) =>{
    axios.post("/products/buy", product,configHeader(getState))
        .then(res=>{
            dispatch({
                type:BUY_PRODUCT,
                payload:res.data
            })
            dispatch(createMessage({leadAdded:res.data.message}))
        })
        
        // returnErrors from thee action
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

// get coins
export const getCoins = () => (dispatch,getState) =>{
    axios.get('/coins/view',configHeader(getState))
        .then(res=>{
            dispatch({
                type:GET_COINS,
                payload:res.data
            })
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

// Edit coin
export const updateCoin = (coin) => (dispatch,getState) =>{
    axios.put("/coins/update", coin,configHeader(getState))
        .then(res=>{
            dispatch(createMessage({leadAdded:'Coins Updated Successfully'}))
            dispatch({
                type:EDIT_COIN,
                payload:res.data
            })
        })
        // returnErrors from thee action
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}
