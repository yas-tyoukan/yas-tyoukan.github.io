const initialState = {
  notifications: [],
  loadingNotifications: false,
  error: false,
};

export default function top(state = initialState, action) {
  switch (action.type) {
    case REQUEST_NOTIFICATIONS:
      return {
        ...state,
        loadingNotifications: true,
        error: false,
      };
    case RECEIVE_NOTIFICATIONS:
      return {
        ...state,
        loadingNotifications: false,
        notifications: action.data,
        error: false,
      };
    case REQUEST_NOTIFICATIONS_FAILED:
      return {
        ...state,
        loadingNotifications: false,
        error: true,
      };
    default:
      return state;
  }
}
