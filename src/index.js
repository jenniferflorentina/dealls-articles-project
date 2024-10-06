import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import AppRoute from './route/app.route'; // Your application routes
import './assets/styles/index.scss'; // Global styles
import { Provider } from 'react-redux';
import store from './stores'; // Redux store

// Create a root for the React app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application
root.render(
    <Provider store={store}>
        <RouterProvider router={AppRoute} />
    </Provider>
);
