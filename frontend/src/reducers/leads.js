import {GET_PRODUCTS, DELETE_LEAD, ADD_PRODUCT,EDIT_PRODUCT} from '../actions/types'

const initialState = {
    products:[]
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_PRODUCTS:
            console.log(action.payload.data)
            return {
                ...state,
                products: action.payload.data
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
        case EDIT_PRODUCT:
            console.log("payload ",action.payload.data)
            const index = state.products.findIndex(el => el.id === action.payload.data.id);
            const newArray = [...state.products]; 
            newArray[index] = action.payload.data;
            return{
                ...state,
                products:newArray,
                isUpdating:false,
            }
        default:
            return state
    }
}

