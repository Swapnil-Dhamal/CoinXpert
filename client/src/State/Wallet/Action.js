import api from "@/config/api";
import * as types from "./ActionType";


export const getUserWallet=(jwt)=>async(dispatch)=>{


    dispatch({type:types.GET_USER_WALLET_REQUEST});

    try{
        const response=await api.get("/api/wallet/userWallet", {
            headers:{
                Authorization:`Bearer ${jwt}`,

            },
        });

        dispatch({type:types.GET_USER_WALLET_SUCCESS, payload:response.data});
        console.log("User wallet fetched successfully");
        console.log("User wallet:  ", response.data);
    }
    catch(error){
        console.log(error);
        dispatch({
            type:types.GET_USER_WALLET_FAILURE,
            error:error.message,
        });
    }
};

export const getWalletTransactions=(jwt)=>async(dispatch)=>{

    dispatch({type:types.GET_USER_WALLET_TRANSACTION_REQUEST});

    try{
        const response=await api.get("/api/wallet/transactions", {
            headers:{
                Authorization:`Bearer ${jwt}`,
            },
        }); 

        const transactionList=Array.isArray(response.data)?
            response.data : response.data?.content??[];

        dispatch({
            type:types.GET_USER_WALLET_TRANSACTION_SUCCESS, 
            payload:transactionList
        });
    }
    catch(error){
        console.log(error);
        dispatch({
            type:types.GET_USER_WALLET_TRANSACTION_FAILURE,
            error:error.message,
        })
    }
}

export const depositMoney=({jwt, orderId, paymentId, navigate})=>
    async (dispatch)=>{
        dispatch({type: types.DEPOSITE_MONEY_REQUEST});

        console.log("Deposite request: ", {orderId, paymentId});

        try{
            const response=await api.put(`api/wallet/deposit`, null,{
                params:{
                    orderId:orderId,
                    paymentId:paymentId
                },
                headers:{
                    Authorization:`Bearer ${jwt}`,
                },

            });
            dispatch({
                type:types.DEPOSITE_MONEY_SUCCESS,
                payload:response.data, 
            });
            dispatch(getUserWallet(jwt));
            dispatch(getWalletTransactions(jwt))
            navigate("/wallet")
            console.log(response.data)
        }

        catch(error){
            dispatch({
                type:types.DEPOSITE_MONEY_FAILURE,
                error:error.message
            });
        }
    }


export const withdrawMoney=({jwt, amount})=>
    async (dispatch)=>{
        dispatch({type: types.WITHDRAW_MONEY_REQUEST});

        console.log("Withdraw request: ", {amount});

        try{
            const response=await api.put(`api/wallet/withdraw/${amount}`, null,{
                
                headers:{
                    Authorization:`Bearer ${jwt}`,
                },

            });
            dispatch({
                type:types.WITHDRAW_MONEY_SUCCESS,
                payload:response.data, 
            });

            dispatch(getUserWallet(jwt));
            navigate("/wallet")
            console.log(response.data)
        }

        catch(error){
            dispatch({
                type:types.WITHDRAW_MONEY_FAILURE,
                error:error.message
            });
        }
    }

export const paymentHandler=({jwt, paymentMethod, amount})=>
    async (dispatch)=>{
        dispatch({type:types.DEPOSITE_MONEY_REQUEST})

        try{
            const response=await api.post(`/api/payment/${paymentMethod}/amount/${amount}`, null,
                {
                    headers:{
                        Authorization:`Bearer ${jwt}`
                    }, 
                }
            );

            window.location.href=response.data.payment_url

            dispatch({
                type:types.DEPOSITE_MONEY_SUCCESS, 
                payload:response.data
            })

        }
        catch(error){
            console.log("Error: ", error)

            dispatch({
                type:types.DEPOSITE_MONEY_FAILURE, 
                error:error.message
            })
            
        }
    }


export const transferMoney=({
    jwt, walletId, reqData})=>{

        console.log("Transfering money");
        return async (dispatch)=>{
            dispatch({type:types.TRANSFER_MONEY_REQUEST})

        try{

            const response=await api.put(`/api/wallet/${walletId}/transfer`, 
                reqData, 
                {
                    headers:{
                        Authorization:`Bearer ${jwt}`,
                    }
                }
            );

            dispatch({
                type:types.TRANSFER_MONEY_SUCCESS,
                payload:response.data
            });


            console.log("Transfer successful", response.data);
        }
    

        catch(error){
            console.log("Error: ", error)
            dispatch({
                type:types.TRANSFER_MONEY_FAILURE,
                error:error.message
            })

        }
    }

}   

export const getWithdrawalHistory=(jwt)=>{

    console.log("Get withdrawal history");

    return async(dispatch)=>{
        dispatch({type:types.WITHDRAWAL_HISTORY_REQUEST})
    
    try{

        const response=await api.get(`/api/withdrawal/history`,  {
            headers:{
                Authorization:`Bearer ${jwt}`,
            }}
        );

        dispatch({
            type:types.WITHDRAWAL_HISTORY_SUCCESS,
            payload:response.data,
        });

        console.log("Withdrawal history: ", response.data)


    }

    catch(error){
            console.log("Error: ", error)
            dispatch({
                type:types.WITHDRAWAL_HISTORY_FAILURE,
                error:error.message
            })

        }

}

}