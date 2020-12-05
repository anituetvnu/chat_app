const initialState = {};

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload;
    default:
      return state;
  }
};

export default tokenReducer;
