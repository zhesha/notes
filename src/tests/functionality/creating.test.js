import { act } from 'react-dom/test-utils';
import formVisibleActions from '../../actions/formVisible.actions';
import newNoteActions from '../../actions/newNote.actions';
import { noteListActionType } from '../../reducers/noteList.reducer';
import testUtils from '../utils/test.utils';

let container, mock, store;
beforeEach(() => {
  ({ container, mock, store } = testUtils.createEnvironment());
});
afterEach(() => {
  container = testUtils.clearContainer(container);
  testUtils.clearAxios(mock);
});

it('renders form', async () => {
  mock.onGet('/').reply(200, { notes: [] });
  await act(async () => {
    testUtils.createApp(container, store);
  });

  const button = document.querySelector('.addButton');
  expect(button).not.toBeNull();
  act(() => {
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  const form = document.querySelector('.newNote');
  expect(form).not.toBeNull();
});

it('send post with updated data', async () => {
  const newNoteData = {
    text: 'test text',
    color: '555555',
    name: 'test name',
    gravatar: 'test avatar'
  };

  mock.onGet('/').reply(200, {
    notes: []
  });

  await sendData(newNoteData);

  const sentData = JSON.parse(mock.history.post[0].data);
  expect(sentData['text']).toBe('test text');
  expect(sentData['name']).toBe('test name');
  expect(sentData['avatar']).toBe('test avatar');
  expect(sentData['color']).toBe('555555');
  expect(sentData['date']).not.toBeNull();
});

it('show loader if waiting end of post request', async () => {
  mock.onGet('/').reply(200, { notes: [] });

  store.dispatch(formVisibleActions.showForm());
  store.dispatch(newNoteActions.updateNewNote({ text: 'test' }));

  await act(async () => {
    testUtils.createApp(container, store);
  });

  store.dispatch({ type: noteListActionType.NOTE_ADD_REQUEST });
  store.dispatch(formVisibleActions.showForm());

  const loader = document.querySelector('.loader');
  expect(loader).not.toBeNull();
});

it('added successfully', async () => {
  const newNoteData = { text: 'test text' };

  mock.onGet('/').reply(200, { notes: [] });
  mock.onPost('/').reply(200, { notes: [newNoteData] });

  await sendData(newNoteData);
  expect(store.getState().noteList.data.length).toBe(1);
});

async function sendData(newNoteData) {
  store.dispatch(formVisibleActions.showForm());
  store.dispatch(newNoteActions.updateNewNote(newNoteData));

  await act(async () => {
    testUtils.createApp(container, store);
  });

  const button = document.querySelector('[type=submit]');
  expect(button).not.toBeNull();

  await act(async () => {
    await button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  expect(mock.history.post.length).toBe(1);
}
