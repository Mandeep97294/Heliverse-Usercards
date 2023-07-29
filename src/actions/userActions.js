import axios from 'axios';

export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const ADD_TO_TEAM = 'ADD_TO_TEAM';

const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

const addToTeam = (user) => ({
  type: ADD_TO_TEAM,
  payload: user,
});

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('heliverse_mock_data.json');
      dispatch(fetchUsersSuccess(response.data));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
};

export const addUserToTeam = (user) => {
  return (dispatch) => {
    dispatch(addToTeam(user));
  };
};
