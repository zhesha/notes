import { act } from 'react-dom/test-utils';
import formVisibleActions from '../../actions/formVisible.actions';
import newNoteActions from '../../actions/newNote.actions';
import testUtils from '../utils/test.utils';
import { fireEvent } from '@testing-library/dom';

let container, mock, store;
beforeEach(() => {
  ({ container, mock, store } = testUtils.createEnvironment());
  mock.onGet('/').reply(200, { notes: [] });
  store.dispatch(formVisibleActions.showForm());
});
afterEach(() => {
  container = testUtils.clearContainer(container);
  testUtils.clearAxios(mock);
});

it('preview works', async () => {
  await act(async () => {
    testUtils.createApp(container, store);
  });

  const button = document.querySelector('[data-testid="previewButton"]');

  fireEvent.click(button);
  expect(store.getState().newNote.isPreview).toBe(true);

  const preview = document.querySelector('.preview');
  expect(preview).not.toBeNull();
});

it('preview stop works', async () => {
  await act(async () => {
    testUtils.createApp(container, store);
  });

  const button = document.querySelector('[data-testid="previewButton"]');
  fireEvent.click(button);

  const closeButton = document.querySelector('[data-testid="closeButton"]');
  fireEvent.click(closeButton);
  expect(store.getState().newNote.isPreview).toBe(false);

  const preview = document.querySelector('.preview');
  expect(preview).toBeNull();
});

it('submit from preview works', async () => {
  const newNoteData = { text: 'test text' };
  store.dispatch(formVisibleActions.showForm());
  store.dispatch(newNoteActions.updateNewNote(newNoteData));
  await act(async () => {
    testUtils.createApp(container, store);
  });

  const button = document.querySelector('[data-testid="previewButton"]');
  fireEvent.click(button);

  const submitButton = document.querySelector('[type="submit"]');
  await fireEvent.click(submitButton);

  expect(mock.history.post.length).toBe(1);
});
