import { thunk } from "redux-thunk";
import authReducer from "./Auth/Reducer";

import { combineReducers, legacy_createStore, applyMiddleware } from "redux";
import coinReducer from "./Coin/Reducer";
import walletReducer from "./Wallet/Reducer";
import { paymentDetailsReducer } from "./PaymentDetails/Reducer";
import orderReducer from "./Order/Reducer";
import assetReducer from "./Asset/Reducer";
import watchlistReducer from "./Watchlist/Reducer";

const rootReducer=combineReducers({
    auth:authReducer,
    coin:coinReducer,
    wallet:walletReducer,
    paymentDetails:paymentDetailsReducer,
    order:orderReducer,
    asset:assetReducer,
    watchlist:watchlistReducer,
});

export const store=legacy_createStore(rootReducer, applyMiddleware(thunk))