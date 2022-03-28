import { Action } from 'redux';
import {RootState} from "./store"

interface RecorderState {
  dateStart: string;
}

const START = 'recorder/start';
const STOP = 'recorder/stop';

type StartAction = Action<typeof START>;
type StopAction = Action<typeof STOP>;

export const start = (): StartAction => ({
  type: START,
});

export const stop = (): StopAction => ({
  type: STOP,
});

export const selectRecorderState = (rootState: RootState) => rootState.recorder

export const selectDateStart = (rootState: RootState) => selectRecorderState(rootState).dateStart


const initalState: RecorderState = {
  dateStart: '',
};

const recorderReducer = (
  state: RecorderState = initalState,
  action: StartAction | StopAction
) => {
  switch (action.type) {
    case START:
      return { ...state, dateStart: new Date().toISOString() };
    case STOP:
      //   set recorder to empty string to signify recorder is not running
      return { ...state, dateStart: '' };
    default:
      return state;
  }
};
export default recorderReducer;
