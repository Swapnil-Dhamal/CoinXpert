import * as types from './ActionTypes';

const initialState = {
    asset: null,
    userAssets: [],
    assetDetails: null,
    loading: false,
    error: null,
};

const assetReducer = (state = initialState, action) => {
    switch (action.type) {

        // REQUEST
        case types.GET_ASSET_BY_ID_REQUEST:
        case types.GET_USER_ASSET_REQUEST:
        case types.GET_ASSET_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        // SUCCESS
        case types.GET_ASSET_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                asset: action.payload,
            };

        case types.GET_USER_ASSET_SUCCESS:
            return {
                ...state,
                loading: false,
                userAssets: action.payload,
            };

        case types.GET_ASSET_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                assetDetails: action.payload,
            };

        // FAILURE
        case types.GET_ASSET_BY_ID_FAILURE:
        case types.GET_USER_ASSET_FAILURE:
        case types.GET_ASSET_DETAILS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default assetReducer;