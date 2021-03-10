/* eslint-disable*/
import axios from 'axios';

export function loadName(email:any){
    return(dispatch:any) => {
        return axios.get(`https://6045f35cf0c6dc00177b1132.mockapi.io/testname`)
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
