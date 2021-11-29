import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/auth';

export const Navbar = () => {

    const dispatch = useDispatch();
    const { name } = useSelector(state => state.auth);

    const handleLogout = ( e ) => {
        dispatch( logout() );
    };

    return (
        <div className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand">
                { name }
            </span>

            <button 
                className="btn btn-outline-danger"
                onClick={ handleLogout }
            >
                <i className="fa fa-sign-out-alt" aria-hidden="true"></i>
                <span> Salir </span>
            </button>

        </div>
    );
}
