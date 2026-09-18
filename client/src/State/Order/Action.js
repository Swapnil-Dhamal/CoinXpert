import * as types from './ActionType';
import api from "@/config/api";


export const payOrderPayment=({jwt, order})=> async(dispatch)=> {

    dispatch({type:types.ORDER_COIN_REQUEST});

    try{
        const response=await api.post("/api/orders/pay", 
            order, 
            {
                headers:{
                    Authorization:`Bearer ${jwt}`,
                }
            }
        );

        dispatch({type:types.ORDER_COIN_SUCCESS});
        console.log("Coin purchased successfully");
        console.log(response.data);
    }

    catch(error){
        console.log(error);
        dispatch({
            type:types.ORDER_COIN_FAILURE,
            payload:error.message,
        });
    }



};

export const getOrder=(jwt, orderId)=>{

};

export const getAllOrdersForUser=(jwt)=>async(dispatch)=>{

    dispatch({type:types.GET_ALL_ORDER_REQUEST});

    try{
        const response=await api.get("/api/orders",{
            headers:{
                Authorization:`Bearer ${jwt}`,
            }
        });

        dispatch({
            type:types.GET_ALL_ORDER_SUCCESS,
            payload:response.data,

        });
        console.log("User orders fetched successfully");
        console.log("User orders: ", response.data);
    }
    catch(error){
        console.log(error);
        dispatch({
            type:types.GET_ALL_ORDER_FAILURE,
            payload:error.message,
        });
    }


};