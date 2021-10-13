import axios from "axios";
import { Message, Loading, MessageBox } from "element-ui";
import router from '../src/router'
const service = axios.create({
    baseURL: "http://aaa.fl00.cn:7666",
    timeout: 60000, //设置请求超时时间
    withCredentials: false, //设置跨域是否允许携带凭证(开发环境需要配置，因为要使用跨域；生产环境可能需要将其注释掉！)
});
// 设置post请求头
const contentTypeUTF8 = "application/x-www-form-urlencoded;charset=UTF-8";
const contentTypeJSON = "application/json";
service.defaults.headers.post["Content-Type"] = false ? contentTypeUTF8 : contentTypeJSON;

//设置请求拦截器（在项目中客户端向服务器发送请求之前会进行token校验，token存储在vuex或localstorage中）
service.interceptors.request.use(
    (config) => {
        console.log();
        if (config.url == '/mysql/login') {
            config.headers.token = null
        } else {
            if (sessionStorage.getItem('token')) config.headers.token = sessionStorage.getItem('token')
        }
        //   console.log(config)
        return config;
    },
    (error) => {
        Message({
            message: "请求错误",
        });
        return Promise.reject(error);
    }
);

// 设置响应拦截器
service.interceptors.response.use(
    (response) => {
        if (response.data.code === "00000") {
            return Promise.resolve(response.data);
        } else if (response.data.message == 'token已失效，请重新登录') {
            MessageBox.confirm('登录失效，您可以取消停留在此页面，或重新登录', '确认退出', {
                confirmButtonText: '确认退出',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                console.log('退出')
                router.push("/login")
            }).catch((err) => {
                console.log(err);
            })
        }
        return Promise.resolve(response.data);
    },
    //服务器状态码不是200的情况
    (error) => {
        console.log(error, 1111)
        let { response } = error;
        //当服务器返回错误码时
        if (response) {
            switch (response.status) {
                //401表示权限，一般是当前请求需要用户验证（一般是未登录）
                case 401:
                    Message((error, data) => {
                        console.log(error + " " + data);
                    });
                    break;
                //403表示服务器已经理解请求，但是拒绝执行它（一般是token过期）
                case 407:
                    // Toast({
                    //     message: '登录过期，请重新登录',
                    //     duration: 1000,
                    //     forbidClick: true
                    // });
                    //localStorage.removeItem('Authorization');  //token过期时将localStorage中的token置空，跳转到登录页，调用登录接口获取token再保存在vuex与localStorage中！！！
                    break;
                //404表示找不到页面
                case 404:
                    Message({
                        message: "网络请求不存在",
                    });
                    break;
                default:
                    Message({
                        message: "请求数据失败",
                    });
            }
            return Promise.reject(error);
        } else if (error.message.includes("timeout")) {
            Message({
                message: "请求超时",
            });
        }
        //当服务器没有返回结果时，可能是没有网
        else {
            if (!window.navigator.onLine) {
                //如果断网了：可以跳转到断网页面
                Message({
                    message: "请检查网络是否连接正常！",
                });
                return;
            }
            return Promise.reject(error);
        }
    }
);

/**********************************************
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        service
            .get(url, {
                params: params ? params : "",
            })
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

/**********************************************
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export const post = (url, params) => {
    return new Promise((resolve, reject) => {
        service
            .post(url, params)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

/**********************************************
 * put方法，对应put请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function put(url, params) {
    return new Promise((resolve, reject) => {
        service
            .put(url, JSON.stringify(params))
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

/**********************************************
 * delete方法，对应delete请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function del(url, params) {
    return new Promise((resolve, reject) => {
        service
            .delete(url, JSON.stringify(params))
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
