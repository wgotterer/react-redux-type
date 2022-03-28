import { AnyAction } from 'redux';

interface UserEvent {
  id: number;
  title: string;
  dateStart: string;
  dateEnd: string;
}

// UserEventsReducer describes the state of the reducer. We extract the id type from the UserEvnt interface with square brackets
interface UserEventsState {
  byIds: Record<UserEvent['id'], UserEvent>;
  // allIds stores a list of user ids in an array
  allIds: UserEvent['id'][];
}

const initalState: UserEventsState = {
  byIds: {},
  allIds: [],
};

const userEventsReducer = (
  state: UserEventsState = initalState,
  action: AnyAction
) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

export default userEventsReducer;
