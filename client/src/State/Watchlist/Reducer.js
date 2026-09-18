import * as types from "./ActionType";

const initialState = {
  userWatchlist: null,
  watchlist: null,
  message: null,
  loading: false,
  error: null,
};

const watchlistReducer = (state = initialState, action) => {
  switch (action.type) {
    // ===== REQUESTS =====
    case types.GET_USER_WATCHLIST_REQUEST:
    case types.CREATE_WATCHLIST_REQUEST:
    case types.GET_WATCHLIST_BY_ID_REQUEST:
    case types.ADD_ITEM_TO_WATCHLIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    // ===== SUCCESS =====
    case types.GET_USER_WATCHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        userWatchlist: action.payload,
      };

    case types.CREATE_WATCHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        userWatchlist: action.payload,
      };

    case types.GET_WATCHLIST_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        watchlist: action.payload,
      };

    case types.ADD_ITEM_TO_WATCHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    // ===== FAILURE =====
    case types.GET_USER_WATCHLIST_FAILURE:
    case types.CREATE_WATCHLIST_FAILURE:
    case types.GET_WATCHLIST_BY_ID_FAILURE:
    case types.ADD_ITEM_TO_WATCHLIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default watchlistReducer;