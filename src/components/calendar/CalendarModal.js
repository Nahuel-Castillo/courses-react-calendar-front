import React, { useEffect, useState } from 'react';

import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../actions/ui';
import { addNewEvent, editEvent, setActiveEvent } from '../../actions/events';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add( 1, 'hours');

const initEvent = {
    id: 0, 
    title:'', 
    notes: '', 
    start: now.toDate(),
    end: now.clone().add( 1, 'hours' ).toDate()
};

export const CalendarModal = () => {

    const { modalOpen: modalIsOpen } = useSelector( state => state.ui );
    const { activeEvent } = useSelector( state => state.calendar );
    const dispatch = useDispatch();

    const [validTitle, setValidTitle] = useState(true);
    const [validStartDate, setValidStartDate] = useState(true);
    const [validEndDate, setValidEndDate] = useState(true);

    const [formValues, setFormValues] = useState( initEvent );

    const { title, notes, start, end } = formValues;

    useEffect(() => {

        setFormValues( activeEvent || initEvent );

    }, [ activeEvent, setFormValues]);

    const handleInputChange = ( { target } ) => {
        setFormValues({
            ...formValues,
            [ target.name ]: target.value 
        });
    };

    const handleStartDateChange = ( date ) => {
        setFormValues( {
            ...formValues,
            start: date
        });
    };

    const handleEndDateChange = ( date ) => {
        setFormValues( {
            ...formValues,
            end: date
        });
    };

    const afterOpenModal = () => {

    };

    const handleCloseModal = () => {
        dispatch( closeModal() );
        dispatch( setActiveEvent( null ) );
        setFormValues( initEvent );
    };

    const handleFormSubmit = ( e ) => {

        e.preventDefault();

        const momentStart = moment( start );
        const momentEnd = moment( end );

        if ( momentStart.isSameOrAfter( momentEnd ) ) {

            return Swal.fire( 'Error' , 'La segunda fecha debe ser después de la primera', 'error' ) 
        }

        if ( !title || title.length < 1 ) {
            return setValidTitle( false );
        } 
        setValidTitle( true );

        if ( start === null ) {

            return setValidStartDate( false );
        } 
        setValidStartDate( true );
        
        if ( end === null ) {

            return setValidEndDate( false );
        } 
        setValidEndDate( true );

        handleCloseModal();

        if ( activeEvent ) {
            dispatch( editEvent({
                ...activeEvent,
                ...formValues,
            }));

        } else {
            
            dispatch( addNewEvent( { 
                ...formValues
            }));
        }

    };

    return (
        <Modal
            className="modal"
            closeTimeoutMS={ 200 }
            isOpen={ modalIsOpen }
            onAfterOpen={ afterOpenModal }
            onRequestClose={ handleCloseModal }
            style={ customStyles }
            overlayClassName="modal-fondo"
        >
            <h1> { activeEvent ? 'Editar Evento' : 'Nuevo Evento' } </h1>
            <hr />
            <form className="container" onSubmit={ handleFormSubmit } >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        name='start'
                        className={ `form-control ${ !validStartDate && 'is-invalid' }` } 
                        onChange={ handleStartDateChange }
                        value={ start }
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        name='end'
                        onChange={ handleEndDateChange }
                        minDate={ start }
                        value={ end }
                        className={ `form-control ${ !validEndDate && 'is-invalid' }` } 
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={ `form-control ${ !validTitle && 'is-invalid' }` } 
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={ title }
                        onChange={ handleInputChange }
                        autoFocus
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ notes }
                        onChange={ handleInputChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
