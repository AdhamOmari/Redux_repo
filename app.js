

// create redux object
const redux = require('redux');
// middleware config
// to create middleware connection 


const reduxLogger = require('redux-logger');


// create store from redux library   ** old Syntaxes (redux.createStore)  
const createStore = redux.legacy_createStore;



// to create to more than one store with deferent action 
const combineReducers = redux.combineReducers;



// to create the middleware 
const applyMiddleware = redux.applyMiddleware;

const logger = reduxLogger.createLogger();












// add the type for the action 
const BUY_CAKE = 'BUY_CAKE';
const BY_ICE_CREAM = 'BY_ICE_CREAM'



// action creator 
// Action creator is a function that returns an actions
const buyCake = () => {
    return {
        type: BUY_CAKE,
        info: 'first redux action'
    }
}
const buyIcCream = () => {
    return {
        type: BY_ICE_CREAM,
        info: 'first redux action'
    }
}


// (previousState,Action )=> new State


// state 
// initial state for reducer, Reducer -> (previousstate, action) =>newState

const initialStateCake = {
    numofCakes: 10,
}
const initialStateIcCreem = {
    numOfIceCreams: 20

}



///  we can create one store reducer 
// const reducer = (state = initialStateCake, action) => {


//     switch (action.type) {
//         case BUY_CAKE: return {
//             ...state, // making the copy of state object
//             numofCakes: state.numofCakes - 1
//         }

// case BY_ICE_CREAM: return {
//     ...state, // making the copy of state object
//     numOfIceCreams: state.numOfIceCreams - 1
// }

//         default: return state
//     }
// }



// create the reducer that  like the handler for update the state 
const reducerCakes = (state = initialStateCake, action) => {


    switch (action.type) {
        case BUY_CAKE: return {
            ...state, // making the copy of state object
            numofCakes: state.numofCakes - 1
        }



        default: return state
    }
}


// reducer for update the state   ****(the reducer is response for  the update of state but the action is responsive for this connection from the store to the reducer and then the store  create this access's to the state  ) ******
const reducerIcCreem = (state = initialStateIcCreem, action) => {


    switch (action.type) {

        case BY_ICE_CREAM: return {
            ...state, // making the copy of state object
            numOfIceCreams: state.numOfIceCreams - 1
        }



        default: return state
    }
}



// combineReducers to create tow store


//  create object from the combineReducers we add the key and the reducer for the store 
const rootReduser = combineReducers({
    cake: reducerCakes,
    icCreem: reducerIcCreem
})


//  create store and take params for reducer 
const store = createStore(rootReduser,applyMiddleware(logger));



// log the initial state 

console.log('initial state', store.getState());



// add listeners to state every time state update the  state update 
store.subscribe(() => {});


// The subscribe listerner will be called eveytime an action is dispatched
const unsubscribe = store.subscribe(() => console.log("updated state", store.getState()))
// dispatch the first action like execute the action then the subscribe method work 
store.dispatch(buyCake());

unsubscribe();
// to get the state after the unsubscribe 
console.log("state after unsubscribe", store.getState());

store.dispatch(buyCake());
store.dispatch(buyCake());



store.dispatch(buyIcCream());
store.dispatch(buyIcCream());
store.dispatch(buyIcCream());









