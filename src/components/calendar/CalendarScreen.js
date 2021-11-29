import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-msg-espagnol';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../actions/ui';
import { loadEvents, setActiveEvent } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import 'moment/locale/es';
import './calendar.scss';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale( 'es' ); 

const localizer = momentLocalizer( moment );

export const CalendarScreen = () => {

    const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month'); 

    const dispatch = useDispatch();

    const { activeEvent, events } = useSelector(state => state.calendar);

    useEffect(() => {

        dispatch( loadEvents() );
    }, []);

    const onDoubleClick = ( ) => {
        dispatch( openModal() );
    }

    const onSelectEvent = ( event ) => {
        dispatch( setActiveEvent( event ) );
    }

    const onViewChange = ( lastView ) => {
        setLastView( lastView );
        localStorage.setItem('lastView', lastView); 
    }

    const onSelectSlot = ( { action, end, start } ) => {

        // if ( action === 'doubleClick' || action === 'select' ) {

        //     dispatch( setActiveEvent( { start, end } ) );
        //     dispatch( openModal() );
        // } 
        // else {
            dispatch( setActiveEvent( null ) );
        // }

    }

    const eventStyleGetter = ( ) => {

        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }

        return style;
    }

    return (
        <div className="calendar-screen">
            <Navbar/>

            <Calendar
                localizer={ localizer }
                events={ events }
                startAccessor="start"
                endAccessor="end"
                messages={ messages }
                eventPropGetter={ eventStyleGetter }
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelectEvent }
                onView={ onViewChange }
                view={ lastView }
                onSelectSlot={ onSelectSlot }
                selectable={ true }
                components= { {
                    event: CalendarEvent
                }}
            />
            { !!activeEvent && <DeleteEventFab /> }
            <AddNewFab />
            <CalendarModal/>
        </div>
    )
}
