import React, {useState} from 'react';
import styles from './Header.module.css'
import {useDispatch} from "react-redux";
import {getSortedUsers} from "../../state/reducers/userReducer";
const Header = () => {
    const dispatch = useDispatch()

    return (
        <div className={styles.header}>
            <div onClick={()=>dispatch(getSortedUsers('id'))} className={styles.item}>id</div>
            <div onClick={()=>dispatch(getSortedUsers('firstName'))} className={styles.item}>First name</div>
            <div onClick={()=>dispatch(getSortedUsers('lastName'))} className={styles.item}>LastName</div>
            <div onClick={()=>dispatch(getSortedUsers('email'))} className={styles.item}>Email</div>
            <div onClick={()=>dispatch(getSortedUsers('phone'))} className={styles.item}>Phone</div>
            <div onClick={()=>dispatch(getSortedUsers('state'))} className={styles.item}>State</div>
        </div>
    );
};

export default Header;
