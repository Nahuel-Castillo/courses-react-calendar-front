import React, { useEffect, Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import { startCheking } from '../actions/auth';
// import { loadEvents } from '../actions/events';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

// const LoginScreen = lazy( () => import('../components/auth/LoginScreen'));
// const CalendarScreen = lazy( () => import('../components/calendar/CalendarScreen'));

export const AppRouter = () => {

    const dispatch = useDispatch();

    const { checking, uid } = useSelector(state => state.auth);

    // const token = localStorage.getItem('token') || '' ;

    useEffect(() => {
        
        dispatch( startCheking() );

    }, [ dispatch ]);
    
    if ( checking ) {                                                                                                                               
        return <h4> Loading... </h4>

    } 
    
    return (
        <Router>
            {/* <Suspense fallback={<div className="mx-auto my-auto">  <h4> Loading... </h4> </div> } > */}
            <div>
                <Switch>

                    <PublicRoute isLoggedIn={ !!uid } exact path="/login" component={ LoginScreen }/>
                    <PrivateRoute isLoggedIn={ !!uid } exact path="/" component={ CalendarScreen }/>
                    <Redirect to="/login" />
                </Switch>
            </div>
            {/* </Suspense>             */}
        </Router> 
    );
}  