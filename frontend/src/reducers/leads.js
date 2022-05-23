import {GET_PRODUCTS, DELETE_LEAD, ADD_PRODUCT,EDIT_PRODUCT,GET_COINS,EDIT_COIN,BUY_PRODUCT} from '../actions/types'

const initialState = {
    products:[],
    coins:[]
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload.data
            };
        case GET_COINS:
            console.log(action.payload.data)
            return {
                ...state,
                coins: action.payload.data
            };


        // delete product on the UI
        case DELETE_LEAD:
            return{
                ...state,
                products:state.products.filter(product => product.id !== action.payload)
            };
        // add product
        case ADD_PRODUCT:
            return{
                ...state,
                products:[...state.products, action.payload.data]
            } 
        // Edit product
        case BUY_PRODUCT:
        case EDIT_PRODUCT:
            const index = state.products.findIndex(el => el.id === action.payload.data.id);
            const newArray = [...state.products]; 
            newArray[index] = action.payload.data;
            return{
                ...state,
                products:newArray,
                
            }
        // Edit coin
        case EDIT_COIN:
            const coinsindex = state.coins.findIndex(el => el.id === action.payload.data.id);
            const coinsnewArray = [...state.coins]; 
            coinsnewArray[coinsindex] = action.payload.data;
            return{
                ...state,
                coins:coinsnewArray,
                
            }
        default:
            return state
    }
}

