import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import App from '../App';
import store from '../store';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import formVisibleActions from '../actions/formVisible.actions';
import { fireEvent } from '@testing-library/react';

let container;
let mock;
beforeEach(async () => {
  mock = new MockAdapter(axios);
  mock.onGet('/').reply(200, {
    notes: []
  });
  container = document.createElement('div');
  document.body.appendChild(container);

  store.dispatch(formVisibleActions.showForm());
  await act(async () => {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      container
    );
  });
});
afterEach(() => {
  document.body.removeChild(container);
  container = null;
  mock.restore();
  mock.reset();
});

it('change text', async () => {
  const textarea = document.querySelector('textarea');
  expect(textarea).not.toBeNull();
  fireEvent.change(textarea, { target: { value: 'test text' } });
  expect(store.getState().newNote.text).toBe('test text');
});

it('change avatar', async () => {
  const openButton = document.querySelector('.avatarButton');
  expect(openButton).not.toBeNull();
  fireEvent.click(openButton);

  const field = document.querySelector('.avatarEmailField');
  expect(field).not.toBeNull();
  fireEvent.change(field, { target: { value: 'test' } });

  const okButton = document.querySelector('.avatarButton');
  expect(okButton).not.toBeNull();
  fireEvent.click(okButton);
  expect(store.getState().newNote.gravatar).toBe(
    '098f6bcd4621d373cade4e832627b4f6'
  );
});

it('change color', async () => {
  const openButton = document.querySelector('.colorButton');
  expect(openButton).not.toBeNull();
  fireEvent.click(openButton);

  const colors = document.querySelectorAll('.colorVariant');
  expect(colors.length).toBe(8);
  fireEvent.click(colors[2]);

  expect(store.getState().newNote.color).toBe('BE3934');
});

it('change name', async () => {
  const nameField = document.querySelector('.nameField');
  expect(nameField).not.toBeNull();

  fireEvent.change(nameField, { target: { value: 'test name' } });

  expect(store.getState().newNote.name).toBe('test name');
});
