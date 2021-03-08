/* eslint-disable*/
const defaultState = {
  value: 'write something~!'
};

const reducer = (
  state = defaultState, action:any,
) => {
  console.log('reducer',action.value);
  console.log('reducer',action);

  switch(action){
    case 'get_name':
      return {...state, value: action.value};
    default:
      return state;
  }
};

export default reducer;
