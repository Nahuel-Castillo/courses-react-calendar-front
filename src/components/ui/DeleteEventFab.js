

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEvent, setActiveEvent } from '../../actions/events';

export const DeleteEventFab = () => {

    const dispatch = useDispatch();
    const { activeEvent } = useSelector(state => state.calendar);

    const handleDeleteEvent = e => {
        dispatch( setActiveEvent( null ) );
        dispatch( deleteEvent( activeEvent ) );
    }

    return (
        <button 
            className="btn btn-danger fab-danger"
            onClick={ handleDeleteEvent }
        >

            <i className="fas fa-trash" aria-hidden="true"></i>
        </button>
    )
}
