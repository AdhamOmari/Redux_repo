const redux = require('redux');
const createStore = redux.legacy_createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMedeal = require('redux-thunk').default
const axios = require('axios');


const initialState = {
    loading: false,
    users: [],

}


const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST ';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS ';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE ';



const fetchUserRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }

}
const fetchUserSuccess = user => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }

}
const fetchUserFailure = () => {
    return {
        type: FETCH_USERS_FAILURE,
    }

}
console.log("res.data");




const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case FETCH_USERS_SUCCESS:
            return {
                loading: true,
                user: action.payload,
                error: ''
            }
        case FETCH_USERS_FAILURE:
            return {
                loading: false,
                user: [],
            }




    }

}
debugger;



const store = createStore(reducer, applyMiddleware(thunkMedeal));
store.subscribe(() => console.log(store.getState()));



// its work  like the async function 

const fetchUser = () => {

    return function (dispatch) {

        console.log("befor");
        dispatch(fetchUserRequest());
        

        axios.get('http://dummyjson.com/products/1')
        .then(res => {

            console.log(res);
          const usersData = res.data.map(user => user.id);
            console.log(usersData);
            dispatch(fetchUserSuccess(usersData))

        }).catch((err) => {
                dispatch(fetchUserFailure(err))
            })
            
        }

}

store.dispatch(fetchUser())




