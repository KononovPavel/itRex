import React from 'react';
import './userProfile.css'
import {useSelector} from "react-redux";
import {AppStateType} from "../../state";
import {user} from "../../state/reducers/userReducer";

interface Props {
    active: boolean,
    setActive: (active: boolean) => void
}

const UserProfile: React.FC<Props> = ({active, setActive}) => {

    const currentUser = useSelector<AppStateType, user>(state => state.userReducer.currentUser)

    return (
        <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
            <div className={'modal_content'} onClick={e => e.stopPropagation()}>
                    {
                        currentUser && <div className={'info'}>
                            <p>Profile info:</p>
                            <p>Selected profile : {currentUser.firstName}{currentUser.lastName}</p>
                            <p>Description : {currentUser.description}</p>
                            <p>Address : { currentUser.adress && currentUser.adress.streetAddress}</p>
                            <p>City : { currentUser.adress && currentUser.adress.city}</p>
                            <p>State: {currentUser.adress && currentUser.adress.state}</p>
                            <p>Index : { currentUser.adress && currentUser.adress.zip && currentUser.adress.zip}</p>
                        </div>
                    }
            </div>
        </div>
    );
};

export default UserProfile;
