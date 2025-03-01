import axios from "axios";
import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionTypes";

export const register=(userData)=>async(dispatch)=>{

    dispatch({type:REGISTER_REQUEST})

    const baseUrl="http://localhost:8080"

    try{
        const response=await axios.post(`${baseUrl}/api/auth/signUp`, userData);
        const user=response.data;
        // console.log(user);

        dispatch({type:REGISTER_SUCCESS, payload:user.jwt})
        localStorage.setItem("jwt", user.jwt);

    }
    catch(err){
        dispatch({type:REGISTER_FAILURE, payload:err.message})
        console.log(err);
    }
}

export const login = (userData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    const baseUrl = "http://localhost:8080";

    try {
        const response = await axios.post(`${baseUrl}/api/auth/signIn`, userData);
        const user = response.data;

        console.log("Login Response:", user); // Debugging line

        if (!user.jwt) {
            console.error("JWT is missing in login response!");
            dispatch({ type: LOGIN_FAILURE, payload: "JWT not found in response" });
            return;
        }

        localStorage.setItem("jwt", user.jwt);
        dispatch({ type: LOGIN_SUCCESS, payload: user.jwt });
        userData.navigate("/");

    } catch (err) {
        console.error("Login error:", err);
        dispatch({ type: LOGIN_FAILURE, payload: err.message });
    }
};

export const getUser = (jwt) => async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });

    if (!jwt || typeof jwt !== "string") {
        // console.error("Invalid JWT before making request:", jwt);
        dispatch({ type: GET_USER_FAILURE, payload: "Invalid JWT" });
        return; // Stop execution
    }

    console.log("JWT Token being sent:", jwt);

    const baseUrl = "http://localhost:8080";

    try {
        const response = await axios.get(`${baseUrl}/api/users/profile`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });

        console.log("User Profile Data:", response.data);
        dispatch({ type: GET_USER_SUCCESS, payload: response.data });

    } catch (err) {
        console.error("Error fetching user profile:", err);
        dispatch({ type: GET_USER_FAILURE, payload: err.message });
    }
};

export const logout=()=>(dispatch)=>{
    localStorage.clear();
    localStorage.removeItem("jwt");
    dispatch({type:LOGOUT_SUCCESS});
}
