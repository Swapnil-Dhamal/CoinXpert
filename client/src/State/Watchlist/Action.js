import api from '@/config/api';
import * as types from './ActionType';
import { UNSAFE_ErrorResponseImpl } from 'react-router-dom';
import { payOrderPayment } from '../Order/Action';

export const createUserWatchlist=(jwt)=>async(dispatch)=>{

    dispatch({type:types.CREATE_WATCHLIST_REQUEST});

    try{
        const response=await api.get("api/watchlist/create",{
            headers:{
                Authorization:`Bearer ${jwt}`,
            },
        });

        dispatch({
            type:types.CREATE_WATCHLIST_SUCCESS,
            payload:response.data,
        });

        console.log("User watchlist fetched successfully");
        console.log("Watchlist: ", response.data);
    }

    catch(error){
        console.log(error)
        dispatch({
            type:types.CREATE_WATCHLIST_FAILURE,
            error:error.message,
        })
    }


}

export const getUserWatchlist=(jwt)=>async(dispatch)=>{

    dispatch({type:types.GET_USER_WATCHLIST_REQUEST});

    try{
        const response=await api.get("api/watchlist/user", {
            headers:{
                Authorization:`Bearer ${jwt}`,
            }
        })

        dispatch({
            type:types.GET_USER_WATCHLIST_SUCCESS,
            payload:response.data,
        });

        console.log("User watchlist fetched successfully");
        console.log("Watchlist: ", response.data);
    }
    catch(error){
        console.log(error);
        dispatch({
            type:types.GET_USER_WATCHLIST_FAILURE,
            payload:error.message,
        });
    }


}


export const getWatchlistById = (watchlistId) => async (dispatch) => {
  dispatch({ type: types.GET_WATCHLIST_BY_ID_REQUEST });

  try {
    const response = await api.get(`/api/watchlist/${watchlistId}`);

    dispatch({
      type: types.GET_WATCHLIST_BY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_WATCHLIST_BY_ID_FAILURE,
      payload: error.message,
    });
  }
};

// Backend returns a plain string message, not the updated watchlist,
// so we refetch the watchlist after toggling to keep state in sync.
export const addItemToWatchlist = ({ coinId, jwt }) => async (dispatch) => {
  dispatch({ type: types.ADD_ITEM_TO_WATCHLIST_REQUEST });

  try {
    const response = await api.patch(
      `/api/watchlist/add/coin/${coinId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    dispatch({
      type: types.ADD_ITEM_TO_WATCHLIST_SUCCESS,
      payload: response.data, // this is the message string, e.g. "Coin is added to watchlist"
    });

    dispatch(getUserWatchlist(jwt));
  } catch (error) {
    dispatch({
      type: types.ADD_ITEM_TO_WATCHLIST_FAILURE,
      payload: error.message,
    });
  }
};