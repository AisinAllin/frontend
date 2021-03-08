/* eslint-disable*/
import axios from 'axios';

export function loadName(){
    return(dispatch:any) => {
        return axios.get('https://6045d266f0c6dc00177b0cd0.mockapi.io/api/v1/test/:endpoint')
        .then((response:any) => {
            const data:any = response.data[0];
            const action = {
                type: 'get_name',
                data
            }
            dispatch(action)
        })
    }
}
