import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension"
import { newProductReducer, productDetailsReducer, productReducer, productReviewsReducer, productsReducer, reviewReducer } from "./reducers/productReducers";
import { allUsersReducer, authReducer, userDetailsReducer, userReducer } from "./reducers/authReducers";
import { cartReducer } from "./reducers/cartReducers";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "./reducers/orderReducers";



/**The combineReducers helper function turns an object whose values are different reducing functions into a single reducing function 
 * you can pass to createStore. */
const reducer = combineReducers({
    products: productsReducer,
    productDetailss: productDetailsReducer,
    auth: authReducer,
    user: userReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    allUsers: allUsersReducer,
    allOrders: allOrdersReducer,
    newProduct: newProductReducer,
    product: productReducer,
    order: orderReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
    userDetails: userDetailsReducer







})

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingInfo: localStorage.getItem('shippingInfo')
            ? JSON.parse(localStorage.getItem('shippingInfo'))
            : {}
    }
}
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store



/*
A store is an object that holds the application's state tree. There should only be a single store in a Redux app, 
as the composition happens on the reducer level.

dispatch(action) is the base dispatch function described above.
getState() returns the current state of the store.
subscribe(listener) registers a function to be called on state changes.
replaceReducer(nextReducer) can be used to implement hot reloading and code splitting. Most likely you won't use it.


https://redux.js.org/understanding/thinking-in-redux/glossary#reducer
*/