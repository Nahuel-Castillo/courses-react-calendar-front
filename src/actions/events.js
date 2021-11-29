
import { fetchWithToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";

const addNewEventAction = ( event ) => ( { type: types.eventAddNew, payload: event } );

const editEventAction = ( event ) => ( { type: types.eventEdit, payload: event } );

const deleteEventAction = ( event ) => ( { type: types.eventRemove, payload: event } );

const loadEventsAction = ( events ) => ( { type: types.eventLoadEvents, payload: events } );

export const clearEvents = ( ) => ( { type: types.eventClear });

export const setActiveEvent = ( event ) => ( { type: types.eventSetActive, payload: event } );

export const loadEvents = () => {
    return async ( dispatch ) => {

        try {
            
            const resp = await fetchWithToken( 'events' );
            const body  = await resp.json();

            const { ok, events } = body;

            if ( ok ) {
                dispatch( loadEventsAction( prepareEvents( events ) ) );
            }
        } catch (error) {
            console.log( error ); 
        }

    };
};

export const addNewEvent = ( event ) => {
    return async( dispatch, getState ) => {
        
        const { uid, name } = getState().auth;

        try {
            
            const resp = await fetchWithToken( 'events', event, 'POST' );
            const body  = await resp.json();
    
            console.log( body );
    
            if ( body.ok ) {
    
                dispatch( addNewEventAction( { ...event, id: body.event.id, user: { uid, name } } ) );
            }

        } catch ( err ) {
            console.log( err );
        }

    };
};

export const editEvent = ( event ) => {
    return async( dispatch ) => {

        try {
            
            const resp = await fetchWithToken( `events/${ event.id }`, event, 'PUT' );
            const body  = await resp.json();
    
            console.log( body );
    
            if ( body.ok ) {
                dispatch( editEventAction( event ) );
            }

        } catch ( err ) {
            console.log( err );
        }
    };
};

export const deleteEvent = ( event ) => {
    return async( dispatch ) => {

        const resp = await fetchWithToken( `events/${ event.id }`, event, 'DELETE' );
        const body  = await resp.json();

        console.log( body );

        if ( body.event ) {
            dispatch( deleteEventAction( event ) );
        }
    };
};



