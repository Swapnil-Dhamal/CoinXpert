import * as types from './ActionType';

const initialState={

    order:null,
    orders:[],
    loading:false,
    error:null,
}

const orderReducer=(state=initialState, action) =>{

    switch(action.type){
        case types.GET_ALL_ORDER_REQUEST:
        case types.GET_ORDER_BY_ID_REQUEST:
        case types.ORDER_COIN_REQUEST:
            return{
                ...state,
                loading:true,
                error:null,
            }

        case types.GET_ORDER_BY_ID_SUCCESS:
        case types.ORDER_COIN_SUCCESS:
            return{
                ...state,
                order:action.payload,
                loading:false,
                error:null,
            }
         case types.GET_ALL_ORDER_SUCCESS:
            return{
                ...state,
                order:action.payload,
                loading:false,
                error:null,
            }

        case types.GET_ALL_ORDER_FAILURE:
        case types.GET_ORDER_BY_ID_FAILURE:
        case types.ORDER_COIN_FAILURE:
            return{
                ...state,
                order:null,
                loading:false,
                error:action.error,
            }

        default:
            return state;
    }
};

export default orderReducer;