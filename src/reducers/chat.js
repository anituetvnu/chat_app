const initialState = {
  chatUID: '',
  userUID: '',
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
