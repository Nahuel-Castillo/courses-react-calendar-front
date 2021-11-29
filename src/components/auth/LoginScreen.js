import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const LoginScreen = () => {

    const [ values, handleInputChange ] = useForm({
        lEmail: '',
        lPassword: ''
    });

    const [ valuesRegister, handleInputChangeRegister ] = useForm({
        rName: '',
        rEmail: '',
        rPassword: '',
        rPassword2: ''
    });

    const { rName, rEmail, rPassword, rPassword2 } = valuesRegister;

    const dispatch = useDispatch();

    const { lEmail, lPassword } = values;

    const handleLogin = ( e ) => {
        e.preventDefault();

        dispatch( startLogin( lEmail, lPassword ) );

    };

    const handleRegister = ( e ) => {
        e.preventDefault();

        if ( rPassword !== rPassword2 ) {
            return Swal.fire("Error", 'The password must be equal', 'error');
        }

        dispatch( startRegister( rName, rEmail, rPassword ) );
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ handleLogin }>
                        <div className="form-group">
                            <input 
                                name="lEmail"
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                value={ lEmail }
                                onChange={ handleInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                name="lPassword"
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                value={ lPassword }
                                onChange={ handleInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input 
                            
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ handleRegister }>
                        <div className="form-group">
                            <input
                                name="rName"
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                value= { rName }
                                onChange={ handleInputChangeRegister }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                name="rEmail"
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                onChange={ handleInputChangeRegister }
                                value={ rEmail }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                name="rPassword"
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                onChange={ handleInputChangeRegister }
                                value={ rPassword }
                            />
                        </div>

                        <div className="form-group">
                            <input
                                name="rPassword2"
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                onChange={ handleInputChangeRegister }
                                value={ rPassword2 }
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}