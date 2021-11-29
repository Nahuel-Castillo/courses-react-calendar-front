import Swal from 'sweetalert2';

import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";
import { clearEvents } from './events';


export const startLogin = ( email, password ) => {
    return async( dispatch ) => {

        const resp = await fetchWithoutToken( 'auth', { email, password }, 'POST');
        const body = await resp.json();

        const { ok, token, uid, name, msg } = body;

        if ( ok ) {
            localStorage.setItem('token',  token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );
            
            dispatch( login( { uid, name } ) );
        } else {
            Swal.fire('Error', msg, 'error');
        }
    }
};

export const startRegister = ( name, email, password ) => {
    return async( dispatch ) => {

        const resp = await fetchWithoutToken( 'auth/new', { name, email, password }, 'POST');
        const body = await resp.json();

        const { ok, token, uid, name:uname, msg } = body;

        if ( ok ) {
            localStorage.setItem( 'token',  token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );

            dispatch( login( { uid, name: uname } ) );
        } else {
            Swal.fire('Error', msg, 'error');
        }

    } 
};

export const startCheking = () => {

    return async( dispatch ) => {

        const resp = await fetchWithToken( 'auth/renew' );
        const body = await resp.json();

        const { ok, token, uid, name } = body;

        if ( ok ) {
            localStorage.setItem('token',  token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );

            dispatch( login( { uid, name } ) );
        } else {
            dispatch( checkingFinish() );
        }

    }

};

const logoutAction = () => ( { type: types.authLogout } );

export const logout = () => {
    return ( dispatch ) => {

        localStorage.clear();
        
        dispatch( logoutAction() );
        dispatch( clearEvents() );
    };
}

const checkingFinish = () => ( { type: types.authChekingFinish } );

const login = ( user ) => ({
    type: types.authLogin,
    payload: user
});