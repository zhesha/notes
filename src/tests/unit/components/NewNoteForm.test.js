import { act } from 'react-dom/test-utils';
import formVisibleActions from '../../../actions/formVisible.actions';
import { fireEvent } from '@testing-library/react';
import testUtils from '../../utils/test.utils';
import colorsConfig from '../../../config/colors.config';

let container, mock, store;
beforeEach(async () => {
  ({ container, mock, store } = testUtils.createEnvironment());

  mock.onGet('/').reply(200, {
    notes: []
  });
  store.dispatch(formVisibleActions.showForm());
  await act(async () => {
    testUtils.createApp(container, store);
  });
});
afterEach(() => {
  container = testUtils.clearContainer(container);
  testUtils.clearAxios(mock);
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
  const wantedIndex = 2;
  const openButton = document.querySelector('.colorButton');
  expect(openButton).not.toBeNull();
  fireEvent.click(openButton);

  const colors = document.querySelectorAll('.colorVariant');
  expect(colors.length).toBe(8);
  fireEvent.click(colors[wantedIndex]);

  expect(store.getState().newNote.color).toBe(colorsConfig.list[wantedIndex]);
});

it('change name', async () => {
  const nameField = document.querySelector('.nameField');
  expect(nameField).not.toBeNull();

  fireEvent.change(nameField, { target: { value: 'test name' } });

  expect(store.getState().newNote.name).toBe('test name');
});
