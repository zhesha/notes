import rootReducer from '../../reducers';
import testUtils from '../utils/test.utils';
import { act } from 'react-dom/test-utils';

it('reducer create initial state', () => {
  const state = rootReducer(undefined, {});
  const initialState = {
    formVisible: false,
    noteList: { adding: false, loading: false, data: [] },
    newNote: { gravatar: '', name: '', color: '', text: '' }
  };
  expect(state).toEqual(initialState);
});
it('renders without crashing', () => {
  const store = testUtils.createStore();
  let container = testUtils.createContainer();

  act(() => {
    testUtils.createApp(container, store);
  });

  testUtils.clearContainer(container);
});
