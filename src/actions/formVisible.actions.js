import { formVisibleActionType } from '../reducers/formVisible.reducer';

const formVisibleActions = {
  showForm: () => ({ type: formVisibleActionType.SHOW }),
  hideForm: () => ({ type: formVisibleActionType.HIDE })
};
export default formVisibleActions;
