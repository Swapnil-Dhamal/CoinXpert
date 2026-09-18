import { SiPayloadcms } from "react-icons/si";
import * as types from "./ActionTypes";
import api from "@/config/api";


export const getAssetById=({assetId, jwt}) => async(dispatch)=>{

    dispatch({type:types.GET_ASSET_BY_ID_REQUEST});

    try{
        const response=await api.get(`/api/asset/${assetId}`, {
            headers:{
                Authorization:`Bearer ${jwt}`,
            },
        });

        dispatch({
            type:types.GET_ASSET_BY_ID_SUCCESS,
            payload:response.data,
        });

        console.log("Asset by id: ", response.data);
    }
    catch(error){
        dispatch({
            type:types.GET_ASSET_BY_ID_FAILURE,
            error:error.message,
        });
    }

};

export const getAssetDetails=({coinId, jwt}) => async(dispatch) =>{

    console.log("Request for asset");

    dispatch({type:types.GET_ASSET_DETAILS_REQUEST});

    try{
        const response=await api.get(`/api/assets/coin/${coinId}/user`, {
            headers:{
                Authorization:`Bearer ${jwt}`,
            },
        });

        dispatch({
            type:types.GET_ASSET_DETAILS_SUCCESS,
            payload:response.data,
        });

        console.log("Asset details: ", response.data);
    }
    catch(error){
        dispatch({
            type:types.GET_ASSET_DETAILS_FAILURE,
            error:error.message,
        });
    }


};

export const getAssetForUser=({jwt}) => async(dispatch) =>{

    console.log("request for get asset user");

    dispatch({type:types.GET_USER_ASSET_REQUEST});

    try{
        const response=await api.get(`/api/assets`, {
            headers:{
                Authorization:`Bearer ${jwt}`,
            },
        });

        dispatch({
            type:types.GET_USER_ASSET_SUCCESS,
            payload:response.data,
        });

        console.log("Asset details: ", response.data);
    }
    catch(error){
        dispatch({
            type:types.GET_USER_ASSET_FAILURE,
            error:error.message,
        });
    }


};

