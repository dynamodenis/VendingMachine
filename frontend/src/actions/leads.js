import axios from 'axios'
import {GET_PRODUCTS, DELETE_LEAD,ADD_PRODUCT,EDIT_PRODUCT } from './types'
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
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}
