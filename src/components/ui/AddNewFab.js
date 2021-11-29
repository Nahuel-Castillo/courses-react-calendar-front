
import React from 'react';

import { useDispatch } from 'react-redux';
import { setActiveEvent } from '../../actions/events';

import { openModal } from '../../actions/ui';

export const AddNewFab = () => {

    const dispatch = useDispatch();

    const handleAddNew = ( e ) => {
        dispatch( setActiveEvent( null ) );
        dispatch( openModal() );
    };

    return (
        <button
            className="btn btn-primary fab"
            onClick={ handleAddNew }
        >
            <i className="fas fa-plus" aria-hidden="true"></i>
        </button>
    )
}
