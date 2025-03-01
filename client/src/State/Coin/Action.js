import api, { API_BASE_URL } from "@/config/api";
import { FETCH_COIN_BY_ID_FAILURE, FETCH_COIN_BY_ID_REQUEST, FETCH_COIN_BY_ID_SUCCESS, FETCH_COIN_DETAILS_FAILURE, FETCH_COIN_DETAILS_REQUEST, FETCH_COIN_DETAILS_SUCCESS, FETCH_COIN_LIST_FAILURE, FETCH_COIN_LIST_REQUEST, FETCH_COIN_LIST_SUCCESS, FETCH_MARKET_CHART_FAILURE, FETCH_MARKET_CHART_REQUEST, FETCH_MARKET_CHART_SUCCESS, FETCH_TOP_50_COINS_FAILURE, FETCH_TOP_50_COINS_REQUEST, FETCH_TOP_50_COINS_SUCCESS, FETCH_TRENDING_COINS_FAILURE, FETCH_TRENDING_COINS_REQUEST, FETCH_TRENDING_COINS_SUCCESS, SEARCH_COIN_FAILURE, SEARCH_COIN_REQUEST, SEARCH_COIN_SUCCESS } from "./ActionType";
import axios from "axios";



export const getCoinList=(page)=>async(dispatch)=>{

    dispatch({type:FETCH_COIN_LIST_REQUEST})


    try{

        const jwt=localStorage.getItem("jwt");
        const {data}=await api.get(`/api/coins/coinList?page=${page}`,{
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        }

        );
        console.log("Coin list : ", data);

        dispatch({type:FETCH_COIN_LIST_SUCCESS, payload:data});

    }
    catch(err){
        console.log(err);
        dispatch({type:FETCH_COIN_LIST_FAILURE, payload:err.message});
    }
}

export const getTop50Coins=()=>async(dispatch)=>{

    dispatch({type:FETCH_TOP_50_COINS_REQUEST})


    try{
        const response=await axios.get(`${API_BASE_URL}/api/coins/top50`);
        console.log("Top 50 coins : ", response.data);

        dispatch({type:FETCH_TOP_50_COINS_SUCCESS, payload:response.data });

    }
    catch(err){
        dispatch({type:FETCH_TOP_50_COINS_FAILURE, payload:err.message});
        console.log(err);
    }
}

export const getMarketChart=(coinId, days)=>async(dispatch)=>{

    dispatch({type:FETCH_MARKET_CHART_REQUEST})


    try{
        const response=await axios.get(`${API_BASE_URL}/api/coins/${coinId}/chart?days=${days}`);
        console.log("Market chart : ", response.data);

        dispatch({type:FETCH_MARKET_CHART_SUCCESS, payload:response.data });

    }
    catch(err){
        dispatch({type:FETCH_MARKET_CHART_FAILURE, payload:err.message});
        console.log(err);
    }
}

export const fetchCoinDetails=(coinId)=>async(dispatch)=>{

    dispatch({type:FETCH_COIN_DETAILS_REQUEST})


    try{
        const response=await axios.get(`${API_BASE_URL}/api/coins/details/${coinId}`);
        console.log("Coin : ", response.data);

        dispatch({type:FETCH_COIN_DETAILS_SUCCESS, payload:response.data });

    }
    catch(err){
        dispatch({type:FETCH_COIN_DETAILS_FAILURE, payload:err.message});
        console.log(err);
    }
}

export const getCoinById=(coinId)=>async(dispatch)=>{

    dispatch({type:FETCH_COIN_BY_ID_REQUEST})


    try{
        const response=await axios.get(`${API_BASE_URL}/api/coins/${coinId}`);
        console.log("Coin from ID : ", response.data);

        dispatch({type:FETCH_COIN_BY_ID_SUCCESS, payload:response.data });

    }
    catch(err){
        dispatch({type:FETCH_COIN_BY_ID_FAILURE, payload:err.message});
        console.log(err);
    }
}

export const searchCoin=(keyword)=>async(dispatch)=>{

    dispatch({type:SEARCH_COIN_REQUEST})


    try{
        const response=await axios.get(`${API_BASE_URL}/api/coins/search?keyword=${keyword}`);
        console.log("Searched coin : ", response.data);

        dispatch({type:SEARCH_COIN_SUCCESS, payload:response.data });

    }
    catch(err){
        dispatch({type:SEARCH_COIN_FAILURE, payload:err.message});
        console.log(err);
    }
}

export const fetchTrendingCoins=()=>async(dispatch)=>{

    dispatch({type:FETCH_TRENDING_COINS_REQUEST})


    try{
        const response=await axios.get(`${API_BASE_URL}/api/coins/trending`);
        console.log("Trending coins : ", response.data);

        dispatch({type:FETCH_TRENDING_COINS_SUCCESS, payload:response.data });

    }
    catch(err){
        dispatch({type:FETCH_TRENDING_COINS_FAILURE, payload:err.message});
        console.log(err);
    }
}