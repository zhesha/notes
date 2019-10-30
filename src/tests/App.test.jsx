import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import {Provider} from "react-redux";
import configureStore from 'redux-mock-store';
import rootReducer from "../reducers";
import thunk from "redux-thunk";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);
mock.onGet('/').reply(200, {
  notes: []
});
const mockStore = configureStore([thunk]);
const initialState = {
  formVisible: false,
  noteList: { adding: false, loading: false, data: [] },
  newNote: { gravatar: '', name: '', color: '', text: '' }
};

it('reducer create initial state', () => {
  const state = rootReducer(undefined, {});
  expect(state).toEqual(initialState);
});
it('renders without crashing', () => {

  const store = mockStore(initialState);
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
