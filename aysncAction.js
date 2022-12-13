const redux = require('redux');
const createStore = redux.legacy_createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMedeal = require('redux-thunk').default
const axios = require('axios');


const initialState = {
    loading: false,
    users: [],
    error: ''
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
        payload: error
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
                loading: false,
                user: action.payload,
                error: ''
            }
        case FETCH_USERS_FAILURE:
            return {
                loading: false,
                user: [],
                error: action
            }




    }

}
debugger;



const store = createStore(reducer, applyMiddleware(thunkMedeal));
store.subscribe(() => console.log(store.getState()));

const fetchUser = () => {

    return function (dispatch) {
        dispatch(fetchUserRequest())
        axios.get('http://jsonplaceholder.typicode.com/userss').then(res => {


            const usersData = res.data.map(user => user.id);
            console.log(usersData);
            dispatch(fetchUserSuccess(usersData))

        }).catch((err) => {
                dispatch(fetchUserFailure(err,"hello"))
            })
            
        }

}

store.dispatch(fetchUser())





git remote set-url origin https://github.com/AdhamOmari
git remote set-url origin https://github.com/AdhamOmari/Redux_repo
