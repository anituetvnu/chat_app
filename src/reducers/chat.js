const initialState = {
  chatUID: '',
  userUID: '',
  userName: '',
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload;
    default:
      return state;
  }
};

export default chatReducer;
