/* eslint-disable*/
const defaultState = {
  value: ' '
};

const reducer = (
  state = defaultState, action:any,
) => {
  console.log('reducer',action.value);
  console.log('reducer',action.type);
  console.log('reducer',action);

  switch(action.type){
    case 'get_name':
      return {...state, value: action.value};
    default:
      return state;
  }
};

export default reducer;
