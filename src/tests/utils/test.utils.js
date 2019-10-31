import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../../reducers';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from '../../App';
import React from 'react';

const testUtils = {
  createContainer() {
    const container = document.createElement('div');
    document.body.appendChild(container);
    return container;
  },
  clearContainer(container) {
    ReactDOM.unmountComponentAtNode(container);
    document.body.removeChild(container);
    return null;
  },
  createAxios() {
    return new MockAdapter(axios);
  },
  clearAxios(mock) {
    mock.restore();
    mock.reset();
  },
  createStore() {
    return createStore(rootReducer, applyMiddleware(thunk));
  },
  createApp(container, store) {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      container
    );
  },
  createEnvironment() {
    return {
      container: this.createContainer(),
      mock: this.createAxios(),
      store: this.createStore()
    };
  }
};

export default testUtils;
