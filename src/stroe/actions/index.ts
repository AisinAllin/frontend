/* eslint-disable*/
import axios from 'axios';

export function loadName(){
    return(dispatch:any) => {
        return axios.get('https://4f00f4eb-0c1c-46d8-a35e-0256050357ce.mock.pstmn.io/mockGet')
        .then((response:any) => {
            const data:any = response.data.name;
            const action = {
                type: 'get_name',
                value: data
            }
            dispatch(action)
        })
    }
}

// export const login = IUser:IUser => dispatch => {
//   return login(IUser)
//     .then(res => dispatch(getName(res.user.name)))
//     .fail(res => dispatch(receiveErrors(res.responseJSON.errors)))
// }