import axios from "axios"
import { ALL_USERS_FAIL, ALL_USERS_REQUEST, ALL_USERS_SUCCESS, CLEAR_ERROR, 
    DELETE_USER_FAIL, 
    DELETE_USER_REQUEST, 
    DELETE_USER_SUCCESS, 
    LOAD_USER_FAIL, 
    LOAD_USER_REQUEST, 
    LOAD_USER_SUCCESS, 
    LOGIN_FAIL, 
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    LOGOUT_FAIL, 
    LOGOUT_SUCCESS, 
    REGISTER_FAIL, 
    REGISTER_REQUEST, 
    REGISTER_SUCCESS, 
    UPDATE_PASSWORD_FAIL, 
    UPDATE_PASSWORD_REQUEST, 
    UPDATE_PASSWORD_SUCCESS, 
    UPDATE_PROFILE_FAIL, 
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS} from "../constants/authConstants"

export const login = ( email, password ) =>async(dispatch) =>{
    try{
        
        dispatch( { type: LOGIN_REQUEST })
        const config = {
            Headers:{
                "Content-Type": "application/json"
            }
        }
        const data = await axios.post("http://localhost:4000/api/v1/login", { email, password }, config);
        dispatch({ type: LOGIN_SUCCESS, payload: data.data.user})

    } catch(error){
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.errormessage
        })
    }
}


export const register = ( userData ) =>async(dispatch) =>{
    try{
        
        dispatch( { type: REGISTER_REQUEST })
        const config = {
            Headers:{
                "Content-Type": "multipart/form-data"
            }
        }
        const data = await axios.post("http://localhost:4000/api/v1/register", userData, config);

        dispatch({ type: REGISTER_SUCCESS, payload: data.data.user})

    } catch(error){
        console.log("**************register error == ", error.response.data)
        dispatch({
            type: REGISTER_FAIL,
            payload: error.response.data.errormessage
        })
    }
}

export const loadUser = () => async(dispatch) =>{
    try{
        dispatch({
            type: LOAD_USER_REQUEST
        })
        const data = await axios.get(`http://localhost:4000/api/v1/me`)
        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.data.user
        })
    } catch(error){
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Logout user
export const logout = () => async (dispatch) => {
    try {
        await axios.get('http://localhost:4000/api/v1/logout')
        dispatch({
            type: LOGOUT_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateProfile =(userData) => async(dispatch) =>{
    try{
        dispatch({ type: UPDATE_PROFILE_REQUEST})

        const config = {
            Headers:{
                "Content-Type": "multipart/form-data",
            }
        }

        const data = await axios.put("http://localhost:4000/api/v1/me/update", userData, config);

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.data.success
        })
    
    } catch(error){
        dispatch({
            type:UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        })
    }

}

// UPDATE PASSWORD
export const updatePassword = (passwords) => async(dispatch) => {
    try{
        dispatch({ type: UPDATE_PASSWORD_REQUEST})
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const  data  = await axios.put(`http://localhost:4000/api/v1/password/update` ,passwords, config)
        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.data.success
        })

    } catch(error){
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.errormessage
        })       
    }
}

// Get all users
export const allUsers = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_USERS_REQUEST })

        const { data } = await axios.get('http://localhost:4000/api/v1/admin/users')

        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: data.users
        })

    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get user details - ADMIN
export const getUserDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: USER_DETAILS_REQUEST })


        const { data } = await axios.get(`http://localhost:4000/api/v1/admin/users/${id}`)
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}



// Update user - ADMIN
export const updateUser = (id, userData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_USER_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const { data } = await axios.put(`http://localhost:4000/api/v1/admin/users/${id}`, userData, config)
        console.log("below update user !!!!!!!!!!!!")
        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete user - ADMIN
export const deleteUser = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_USER_REQUEST })
        console.log("inside delete user ", id)
        const { data } = await axios.delete(`http://localhost:4000/api/v1/admin/users/${id}`)

        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        console.log(" inside error     ", error)
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}





export const clearErrors = () => async(dispatch) =>{
    dispatch({type: CLEAR_ERROR})
}