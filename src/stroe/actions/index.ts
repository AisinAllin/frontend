/* eslint-disable*/
import axios from 'axios';

export function loadName(){
    return(dispatch:any) => {
        return axios.get('https://6045f35cf0c6dc00177b1132.mockapi.io/testname')
        // return axios.get('https://4f00f4eb-0c1c-46d8-a35e-0256050357ce.mock.pstmn.io/mockGet')
        .then((response:any) => {
            const data:any = response.data[0].name;
            const action = {
                type: 'get_name',
                value: data
            }
            dispatch(action)
        })
    }
}
