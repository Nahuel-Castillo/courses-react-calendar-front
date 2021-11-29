import React from 'react';
import { AppRouter } from './routers/AppRouter';
import { Provider } from 'react-redux';

import './styles.css';
import { store } from './store/store';

export const CalendarApp = () => {
    return (
        <Provider store={ store }>
            <AppRouter/>
        </Provider >
    )
}
