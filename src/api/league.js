
import request from "../utils/require"

export function saveObject(data){
    return request({
        method:'POST',
        url:"/player/saveObject",
        data:data
    })
}
export function getObject(){
    return request({
        method:'get',
        url:"/player/getObject"
    })
}