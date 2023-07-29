import { FETCH_USERS_SUCCESS, ADD_TO_TEAM } from '../actions/userActions';

const initialState = {
  users: [],
  team: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    case ADD_TO_TEAM:
      return {
        ...state,
        team: [...state.team, action.payload],
      };
    default:
      return state;
  }
};

export default userReducer;
