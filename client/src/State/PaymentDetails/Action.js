import api from "@/config/api";
import * as types from "./ActionType";


export const getUserPaymentDetails=(jwt)=>async(dispatch)=>{


    console.log("Request to fetch payment details")

    dispatch({type:types.GET_USER_PAYMENT_DETAILS_REQUEST});

    try{
        const response=await api.get("/api/payment-details", {
            headers:{
                Authorization:`Bearer ${jwt}`,

            },
        });

        dispatch({type:types.GET_USER_PAYMENT_DETAILS_SUCCESS, payload:response.data});
        console.log("User payment details fetched successfully");
        console.log("User payment details:  ", response.data);
    }
    catch(error){
        console.log(error);
        dispatch({
            type:types.GET_USER_PAYMENT_DETAILS_FAILURE,
            payload:error.message,
        });
    }
};

export const addUserPaymentDetails=(jwt, paymentData)=>async(dispatch)=>{

    dispatch({type:types.ADD_USER_PAYMENT_DETAILS_REQUEST});

    console.log("Send request to backend");
    try{
        const response=await api.post("/api/payment-details",
            paymentData,
            {
            headers:{
                Authorization:`Bearer ${jwt}`,
            },
        }); 

        dispatch({type:types.ADD_USER_PAYMENT_DETAILS_SUCCESS, payload:response.data});
        console.log("User payment details added: ", response.data);
    }
    catch(error){
        console.log(error);
        dispatch({
            type:types.ADD_USER_PAYMENT_DETAILS_FAILURE,
            payload:error.message,
        })
    }
}

