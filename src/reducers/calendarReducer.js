import { types } from "../types/types";
// {
        //     id: '',
        //     start: moment().clone().toDate(),
        //     end: moment().clone().add(2, "hours").toDate(),
        //     title: 'Cumple',
        //     notes: 'LLevar el pastel',
        //     user: {
        //         uid: 12345,
        //         name: 'Nahuel'
        //     },
        // }
const initialState = {
    events: [],
    activeEvent:null
};

export const calendarReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        
        case types.eventAddNew :
            return {
                ...state,
                events: [ ...state.events, action.payload ]
            }

        case types.eventSetActive :
            return {
                ...state,
                activeEvent: action.payload
            }

        case types.eventEdit:
            return {
                ...state,
                events: [ 
                    ...state.events.map( event => event.id === action.payload.id ? action.payload : event )
                ]
            }
        case types.eventRemove:
            return {
                ...state,
                events: [ ...state.events.filter( event => event.id !== action.payload.id ) ]
            }

        case types.eventLoadEvents:
            return {
                ...state,
                events: [ ...action.payload ]
            }

        case types.eventClear:
            return {
                ...initialState
            }

        default: 
            return state;
    }
}