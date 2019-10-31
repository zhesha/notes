import { act } from 'react-dom/test-utils';
import formVisibleActions from '../../actions/formVisible.actions';
import newNoteActions from '../../actions/newNote.actions';
import testUtils from '../utils/test.utils';
import { noteSize } from '../../services/drag.service';
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

it('drag zone works', async () => {
  await act(async () => {
    testUtils.createApp(container, store);
  });

  const button = document.querySelector('[data-testid="dragButton"]');

  fireEvent.mouseDown(button);
  expect(store.getState().newNote.isDragging).toBe(true);

  const { x, y } = store.getState().newNote;
  const dragZone = document.querySelector('.dragZone');
  fireEvent.mouseMove(dragZone, { clientX: 400, clientY: 400 });

  expect(store.getState().newNote.x).not.toBe(x);
  expect(store.getState().newNote.y).not.toBe(y);

  fireEvent.mouseUp(dragZone);
  expect(store.getState().newNote.isDragging).toBe(false);
});

it('normal drag', async () => {
  const mousePosition = 400;
  const distance = 10;

  await act(async () => {
    testUtils.createApp(container, store);
  });

  store.dispatch(newNoteActions.startDrag());
  store.dispatch(newNoteActions.drag({ x: mousePosition, y: mousePosition }));
  store.dispatch(newNoteActions.stopDrag());

  const { x, y } = store.getState().newNote;

  store.dispatch(newNoteActions.startDrag());
  store.dispatch(
    newNoteActions.drag({
      x: mousePosition + distance,
      y: mousePosition + distance
    })
  );
  store.dispatch(newNoteActions.stopDrag());

  expect(store.getState().newNote.x).toBe(x + distance);
  expect(store.getState().newNote.y).toBe(y + distance);
});

it("position don't change if gragged out of window", async () => {
  const mousePosition = 400;
  const newPosition = 10;

  await act(async () => {
    testUtils.createApp(container, store);
  });

  store.dispatch(newNoteActions.startDrag());
  store.dispatch(newNoteActions.drag({ x: mousePosition, y: mousePosition }));
  store.dispatch(newNoteActions.stopDrag());

  const { x, y } = store.getState().newNote;

  store.dispatch(newNoteActions.startDrag());
  store.dispatch(newNoteActions.drag({ x: newPosition, y: newPosition }));
  store.dispatch(newNoteActions.stopDrag());

  expect(store.getState().newNote.x).toBe(x);
  expect(store.getState().newNote.y).toBe(y);
});
