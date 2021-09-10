import React from 'react';
import './App.css';
import UsersList from "./components/users/usersList";
import Header from "./components/Header/Header";
import {useDispatch} from "react-redux";

import {getCurrentName, getUsersSearching} from "./state/reducers/userReducer";

function App() {

    //&#60; -- <
    //&#62; -- >
    const dispatch = useDispatch()
    return (
        <div className={'wrapper'}>
            <div className={'container'}>
                <Header/>
                <input  style={{height:'30px', width:'200px', marginTop:'20px'}} type="text" placeholder={'search by name'} onChange={ e => {
                    dispatch(getCurrentName(e.currentTarget.value))
                    setInterval(()=>{  dispatch(getUsersSearching())}, 500)
                    e.preventDefault();
                    e.stopPropagation();
                    console.log(e.currentTarget.value)
                }} />
                <UsersList/>
            </div>
        </div>
    );
}

export default App;
