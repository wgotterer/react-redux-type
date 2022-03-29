import { Action, AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './store';

// export interface UserEvent {
//   id: number;
//   title: string;
//   dateStart: string;
//   dateEnd: string;
// }

// // UserEventsReducer describes the state of the reducer. We extract the id type from the UserEvnt interface with square brackets
// interface UserEventsState {
//   byIds: Record<UserEvent['id'], UserEvent>;
//   // allIds stores a list of user ids in an array
//   allIds: UserEvent['id'][];
// }
// const LOAD_REQUEST = 'userEvents/load_request';

// interface LoadRequestAction extends Action<typeof LOAD_REQUEST> {}

// const LOAD_SUCCESS = 'userEvents/load_successs';

// interface LoadSuccessAction extends Action<typeof LOAD_SUCCESS> {
//   payload: {
//     events: UserEvent[];
//   };
// }

// interface LoadFailureAction extends Action<typeof LOAD_FAILURE> {
//   error: string;
// }

// const LOAD_FAILURE = 'userEvents/load_failure';

// export const loadUserEvents =
//   (): ThunkAction<
//     void,
//     RootState,
//     undefined,
//     LoadRequestAction | LoadSuccessAction | LoadFailureAction
//   > =>
//   async (dispatch, getState) => {
//     dispatch({
//       type: LOAD_REQUEST,
//     });
//     try {
//       const response = await fetch('http://loacalhost:3001/events');
//       const events: UserEvent[] = await response.json();

//       dispatch({
//         type: LOAD_SUCCESS,
//         payload: { events },
//       });
//     } catch (e) {
//       dispatch({
//         type: LOAD_FAILURE,
//         error: 'Failed to load events.',
//       });
//     }
//   };

//   const selectUserEventsState = (rootState: RootState) => rootState.userEvents

//   export const selectUserEventsArray = (rootState: RootState) => {
//       const state = selectUserEventsState(rootState)
//       return state.allIds.map(id => state.byIds[id])
//   }

// const initalState: UserEventsState = {
//   byIds: {},
//   allIds: [],
// };

// const userEventsReducer = (
//   state: UserEventsState = initalState,
//   action: LoadSuccessAction
// ) => {
//   switch (action.type) {
//     case LOAD_SUCCESS:
//       const { events } = action.payload;
//       return {
//         ...state,
//         allIds: events.map(({ id }) => id),
//         byIds: events.reduce<UserEventsState['byIds']>((byIds, event) => {
//           byIds[event.id] = event;
//           return byIds;
//         }, {}),
//       };
//     default: {
//       return state;
//     }
//   }
// };

// export default userEventsReducer;


export interface UserEvent {
  id: number;
  title: string;
  dateStart: string;
  dateEnd: string;
}

interface UserEventsState {
  byIds: Record<UserEvent['id'], UserEvent>;
  allIds: UserEvent['id'][];
}

const LOAD_REQUEST = 'userEvents/load_request';

interface LoadReaquestAction extends Action<typeof LOAD_REQUEST> {}

const LOAD_SUCCESS = 'userEvents/load_success';

interface LoadSuccessAction extends Action<typeof LOAD_SUCCESS> {
  payload: {
    events: UserEvent[];
  };
}

const LOAD_FAILURE = 'userEvents/load_failure';

interface LoadFailureAction extends Action<typeof LOAD_FAILURE> {
  error: string;
}

export const loadUserEvents = (): ThunkAction<
  void,
  RootState,
  undefined,
  LoadReaquestAction | LoadSuccessAction | LoadFailureAction
> => async (dispatch, getState) => {
  dispatch({
    type: LOAD_REQUEST
  });

  try {
    const response = await fetch('http://localhost:3001/events');
    const events: UserEvent[] = await response.json();

    dispatch({
      type: LOAD_SUCCESS,
      payload: { events }
    });
  } catch (e) {
    dispatch({
      type: LOAD_FAILURE,
      error: 'Failed to load events.'
    });
  }
};

const selectUserEventsState = (rootState: RootState) => rootState.userEvents;

export const selectUserEventsArray = (rootState: RootState) => {
  const state = selectUserEventsState(rootState);
  return state.allIds.map(id => state.byIds[id]);
};

const initialState: UserEventsState = {
  byIds: {},
  allIds: []
};

const userEventsReducer = (
  state: UserEventsState = initialState,
  action: LoadSuccessAction
) => {
  switch (action.type) {
    case LOAD_SUCCESS:
      const { events } = action.payload;
      return {
        ...state,
        allIds: events.map(({ id }) => id),
        byIds: events.reduce<UserEventsState['byIds']>((byIds, event) => {
          byIds[event.id] = event;
          return byIds;
        }, {})
      };

    default:
      return state;
  }
};

export default userEventsReducer;