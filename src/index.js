import React from 'react';
import { createRoot } from "react-dom/client";
import 'default/frontend/css/style.css'



import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk';

import App from 'App';
import rootReducer from 'store/rootReducer';


const store = createStore(rootReducer, applyMiddleware(reduxThunk));

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

