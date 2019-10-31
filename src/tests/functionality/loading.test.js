import { act } from 'react-dom/test-utils';
import testUtils from '../utils/test.utils';

let container, mock, store;
beforeEach(() => {
  ({ container, mock, store } = testUtils.createEnvironment());
});
afterEach(() => {
  container = testUtils.clearContainer(container);
  testUtils.clearAxios(mock);
});

it('renders loader', () => {
  act(() => {
    testUtils.createApp(container, store);
  });
  const loader = container.querySelector('.loader');
  expect(loader).not.toBeNull();
});

it('renders board', async () => {
  mock.onGet('/').reply(200, {
    notes: []
  });

  await act(async () => {
    testUtils.createApp(container, store);
  });
  const board = container.querySelector('.board');
  expect(board).not.toBeNull();
});

it('renders error', async () => {
  mock.onGet('/').networkError();

  await act(async () => {
    testUtils.createApp(container, store);
  });
  const error = container.querySelector('.error');
  expect(error).not.toBeNull();
});

it('renders item', async () => {
  mock.onGet('/').reply(200, {
    notes: [{ text: 'test' }]
  });

  await act(async () => {
    testUtils.createApp(container, store);
  });
  const notes = container.querySelectorAll('.note');
  expect(notes.length).toBe(1);
});
