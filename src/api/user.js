
import request from "../utils/require"

export function userLogin(data){
    return request({
        method:'POST',
        url:"/user/login",
        data:data
    })
}