import prepareAxios from "@/config/loginConfig"

// import qs from 'qs';

export function login (params) {
    if (params.phone != "") {
        return prepareAxios.post('/oauth/sms', params, {
            headers:{
                'Content-Type': 'application/json'
            }
        });
    }else{
        return prepareAxios.post('/login', params);
    }
}


export function logout (params) {
    return  prepareAxios.post('/logout',params,{
        headers:{
            'Authorization': 'Bearar '+localStorage.getItem('AUTH-TOKEN')
        }
    });
}
//
// export function getCaptchas (params) {
//     prepareAxios.post(`/oauth/sms-code?${qs.stringify(params)}`);
// }


