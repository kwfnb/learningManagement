/*
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2021-11-05 12:21:33
 * @LastEditors: kongwf
 * @LastEditTime: 2021-11-06 02:24:24
 */
import axios from "axios";
import {VUE_BASE_URL} from "./data";

const instance = axios.create({
    baseURL:VUE_BASE_URL,
})

instance.defaults.timeout = 30000;

//请求拦截
instance.interceptors.request.use(
    function(config){
        console.log("config",config);
        if(config.isJson){
            config.headers["Content-Type"] = 'application/json';
        }
        return config;
    },
    function(err){
        return Promise.reject(err)
    }
);

//响应拦截
instance.interceptors.response.use(
    function(response){
        let resData = response.data;
        console.log("response",response);
        
        return response;
    },
    function(err){
        return Promise.reject(err)
    }
)

export default instance;