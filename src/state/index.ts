import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from "redux-thunk";
import {userReducer} from "./reducers/userReducer";


const rootReducer = combineReducers({
    userReducer
})
export type AppStateType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, applyMiddleware(thunk))
// @ts-ignore
window.store = store
