import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import App from '../../App';
import store from '../../store';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

let container;
let mock;
beforeEach(() => {
  mock = new MockAdapter(axios);
  container = document.createElement('div');
  document.body.appendChild(container);
});
afterEach(() => {
  document.body.removeChild(container);
  container = null;
  mock.restore();
  mock.reset();
});

it('renders loader', () => {
  act(() => {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      container
    );
  });
  const loader = container.querySelector('.loader');
  expect(loader).not.toBeNull();
});

it('renders board', async () => {
  mock.onGet('/').reply(200, {
    notes: []
  });

  await act(async () => {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      container
    );
  });
  const board = container.querySelector('.board');
  expect(board).not.toBeNull();
});

it('renders error', async () => {
  mock.onGet('/').networkError();

  await act(async () => {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      container
    );
  });
  const error = container.querySelector('.error');
  expect(error).not.toBeNull();
});

it('renders item', async () => {
  mock.onGet('/').reply(200, {
    notes: [{text: 'test'}]
  });

  await act(async () => {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      container
    );
  });
  const notes = container.querySelectorAll('.note');
  expect(notes.length).toBe(1);
});