import * as types from "./ActionType";

const initialState = {
  userWallet: null,
  walletLoading: false,
  transactionLoading: false,
  withdrawalLoading: false,
  error: null,
  transactions: [],
  withdrawalHistory: [],
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {

    // ===== WALLET =====
    case types.GET_USER_WALLET_REQUEST:
    case types.DEPOSITE_MONEY_REQUEST:
    case types.TRANSFER_MONEY_REQUEST:
    case types.WITHDRAW_MONEY_REQUEST:
      return {
        ...state,
        walletLoading: true,
        error: null,
      };

    case types.GET_USER_WALLET_SUCCESS:
    case types.DEPOSITE_MONEY_SUCCESS:
    case types.TRANSFER_MONEY_SUCCESS:
    case types.WITHDRAW_MONEY_SUCCESS:
      return {
        ...state,
        walletLoading: false,
        userWallet: action.payload,
        error: null,
      };

    case types.GET_USER_WALLET_FAILURE:
    case types.DEPOSITE_MONEY_FAILURE:
    case types.TRANSFER_MONEY_FAILURE:
    case types.WITHDRAW_MONEY_FAILURE:
      return {
        ...state,
        walletLoading: false,
        error: action.error,
      };

    // ===== TRANSACTIONS =====
    case types.GET_USER_WALLET_TRANSACTION_REQUEST:
      return {
        ...state,
        transactionLoading: true,
        error: null,
      };

    case types.GET_USER_WALLET_TRANSACTION_SUCCESS:
      return {
        ...state,
        transactionLoading: false,
        transactions: action.payload,
        error: null,
      };

    case types.GET_USER_WALLET_TRANSACTION_FAILURE:
      return {
        ...state,
        transactionLoading: false,
        error: action.error,
      };

    // ===== WITHDRAWAL HISTORY =====
    case types.WITHDRAWAL_HISTORY_REQUEST:
      return {
        ...state,
        withdrawalLoading: true,
        error: null,
      };

    case types.WITHDRAWAL_HISTORY_SUCCESS:
      return {
        ...state,
        withdrawalLoading: false,
        withdrawalHistory: action.payload,
        error: null,
      };

    case types.WITHDRAWAL_HISTORY_FAILURE:
      return {
        ...state,
        withdrawalLoading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default walletReducer;
