import * as types from "./ActionType";

const initialState = {
  loading: false,
  paymentDetails: null,
  error: null,
  addLoading: false,
  addError: null,
  addSuccess: false,
};

export const paymentDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USER_PAYMENT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.GET_USER_PAYMENT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        paymentDetails: action.payload,
      };

    case types.GET_USER_PAYMENT_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error:action.error,
        paymentDetails: null,
      };

    case types.ADD_USER_PAYMENT_DETAILS_REQUEST:
      return {
        ...state,
        addLoading: true,
        addError: null,
        addSuccess: false,
      };

    case types.ADD_USER_PAYMENT_DETAILS_SUCCESS:
      return {
        ...state,
        addLoading: false,
        addSuccess: true,
        paymentDetails: action.payload, // update the details after adding
      };

    case types.ADD_USER_PAYMENT_DETAILS_FAILURE:
      return {
        ...state,
        addLoading: false,
        addError: action.error,
      };

    default:
      return state;
  }
};
