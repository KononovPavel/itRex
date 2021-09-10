import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../state";
import {getCurrentUser, getSortedUsers, getUsers, user} from "../../state/reducers/userReducer";
import styles from './usersList.module.css'
import UserProfile from "../profile/userProfile";

const UsersList:React.FC = () => {
    const dispatch = useDispatch()
    const[modalActive, setModalActive] = useState(false)
    useEffect(() => {
        dispatch(getUsers())
        setTimeout(()=>dispatch(getSortedUsers('id')),500)
    }, [dispatch])
    const users = useSelector<AppStateType, user[]>(state => state.userReducer.users);

    const onClickHandler = (user:user) => {
        dispatch(getCurrentUser(user))
        setModalActive(true)
    }
    return (
        <>
            <div>
            {
                !users.length
                    ? <div>Загрузка пользователей...</div>
                    : <div className={styles.userBlock}>
                        {users.map((user=> <div key={user.id} className={styles.userItem} >
                            <div onClick={()=>onClickHandler(user)}>{user.id}</div>
                            <div onClick={()=>onClickHandler(user)}>{user.firstName}</div>
                            <div onClick={()=>onClickHandler(user)}>{user.lastName}</div>
                            <div onClick={()=>onClickHandler(user)}>{user.email}</div>
                            <div onClick={()=>onClickHandler(user)}>{user.phone}</div>
                            <div onClick={()=>onClickHandler(user)}>{user.adress? user.adress.state : 'No info'}</div>
                        </div>))}
                    </div>
            }
            <UserProfile active={modalActive} setActive={setModalActive}/>
            </div>
        </>
    );
};

export default UsersList;
