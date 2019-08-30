import {applyMiddleware, combineReducers, createStore} from "redux";
import reducer from "./reducer";
import thunkMiddleware from 'redux-thunk';


const store = createStore(
    reducer,
    applyMiddleware(thunkMiddleware)
);

/*let redusers = combineReducers({
    mySession: mySessionReducer,
    profile: profileReducer,
    chat: chatReducer,
    style: styleReducer
});

let store = createStore(redusers, applyMiddleware(thunkMiddleware));*/

export default store;