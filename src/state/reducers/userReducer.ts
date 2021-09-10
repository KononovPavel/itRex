import {Dispatch} from "react";
import {userAPI} from "../../API/userAPI";

export enum ActionTypes {
    SET_USERS_BY_API = 'SET_USERS_BY_API',
    SET_CURRENT_USER = 'SET_CURRENT_USER',
    SET_SORT_USERS = 'SET_SORT_USERS',
    SEARCH_BY_NAME = 'SEARCH_BY_NAME',
    SET_CURRENT_NAME  = 'SET_CURRENT_NAME'
}


type addressType = {
    streetAddress: string,
    city: string,
    state: string,
    zip: string,
}

 export interface user {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    adress: addressType,
    description: string
}

type usersState = {
    users: user[],
    currentUser: user,
    currentName:string
}
let USERS_STATE: usersState = {
    users: [],
    currentUser: {} as user,
    currentName:''
}

type setUsers = {
    type: ActionTypes.SET_USERS_BY_API,
    payload: user[]
}
type setCurrentUser = {
    type: ActionTypes.SET_CURRENT_USER,
    payload: user
}
type sortUsers = {
    type:ActionTypes.SET_SORT_USERS,
    payload:string | null
}
type searchByName = {
    type:ActionTypes.SEARCH_BY_NAME,
}
type setCurrentName = {
    type:ActionTypes.SET_CURRENT_NAME,
    name:string
}

type action = setUsers | setCurrentUser | sortUsers | searchByName | setCurrentName


export const userReducer = (state: usersState = USERS_STATE, action: action): usersState => {

    switch (action.type) {
        case ActionTypes.SET_USERS_BY_API: {
            return {...state, users: [...state.users, action.payload].flat(2)}
        }
        case ActionTypes.SET_CURRENT_USER: {
            return {...state, currentUser: action.payload}
        }
        case ActionTypes.SET_SORT_USERS:{
            if(action.payload === '') return {...state, users:[...state.users]}
            if(action.payload === 'firstName'){
                return {
                    ...state,
                    users:[...state.users.sort((a,b)=> a.firstName.toLowerCase() > b.firstName.toLowerCase() ? 1:-1)]
                }
            }
            if(action.payload === 'lastName'){
                return {
                    ...state,
                    users:[...state.users.sort((a,b)=> a.lastName.toLowerCase() > b.lastName.toLowerCase() ? 1:-1)]
                }
            }
            if(action.payload === 'email'){
                return {
                    ...state,
                    users:[...state.users.sort((a,b)=> a.email.toLowerCase() > b.email.toLowerCase() ? 1:-1)]
                }
            }
            if(action.payload === 'phone'){
                return {
                    ...state,
                    users:[...state.users.sort((a,b)=> a.phone.toLowerCase() > b.phone.toLowerCase() ? 1:-1)]
                }
            }
            if(action.payload === 'id'){
                return {
                    ...state,
                    users:[...state.users.sort((a,b)=> a.id > b.id ? 1 : -1)]
                }
            }
            if(action.payload ==='state') {
                return {
                    ...state,
                    users:[...state.users.sort((a,b)=> a.adress.state > b.adress.state ? 1 : -1)]
                }
            }
            return {...state}
        }
        case ActionTypes.SEARCH_BY_NAME:{
            if(state.currentName === ''){
                return {...state, users:[...state.users]}
            }
            return {
                ...state,
                users:[...state.users.filter(user => user.firstName.toLowerCase().includes(state.currentName.toLowerCase()))]
            }
        }
        case ActionTypes.SET_CURRENT_NAME:{
            return {...state, currentName:action.name}
        }
        default: {
            return state;
        }
    }
}

const setUsers = (users: user[]): setUsers => ({type: ActionTypes.SET_USERS_BY_API, payload: users})
const setCurrentUser = (user: user): setCurrentUser => ({type: ActionTypes.SET_CURRENT_USER, payload: user})
const setSortUsers = (action:string | null):sortUsers=>({type:ActionTypes.SET_SORT_USERS,payload:action})
const setSearchByName = ():searchByName=>({type:ActionTypes.SEARCH_BY_NAME})
const setCurrentName= (value:string):setCurrentName=>({type:ActionTypes.SET_CURRENT_NAME,name:value})


export const getUsers = () => async (dispatch: Dispatch<setUsers>) => {
    dispatch(setUsers(await userAPI.getUsers()))
}
export const getCurrentUser = (user: user) => (dispatch: Dispatch<setCurrentUser>) => {
    dispatch(setCurrentUser(user))
}
export const getSortedUsers = (value:string | null)=>(dispatch:Dispatch<sortUsers>)=>{
    dispatch(setSortUsers(value))
}

export const getUsersSearching = ()=> (dispatch :Dispatch<searchByName>)=>{
        dispatch(setSearchByName())
    console.log('dispatch searching')
}
export const getCurrentName = (value:string)=>(dispatch :Dispatch<setCurrentName>)=>{
    dispatch(setCurrentName(value))
}


