import axios from "axios";
import { BASE_URL } from "./base";
import { ElMessage } from "jy-element-plus";
import { validateRes, getResData,isFile } from "./util";
import { ElLoading } from "jy-element-plus";
import router from "../router/index.js";


axios.defaults.baseURL = BASE_URL;

// axios.defaults.baseURL = "/api";

axios.defaults.timeout = 10000;


const axiosInstance = axios.create({
  method: "post",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

let loading;

//请求拦截
axiosInstance.interceptors.request.use((config) => {
  config.headers["cr-token"] = localStorage.getItem(`token`);

  if (!config.noLoading) {
    loading = ElLoading.service({
      lock: true,
      text: "正在加载...",
      background: "transparent",
    });
  }

  return config;
});

//响应拦截
axiosInstance.interceptors.response.use(
    (response) => {
      if (response.data && validateRes(response)) {
        loading.close();
        return isFile(response) ? response : getResData(response.data);
      } else {
        loading.close();
        ElMessage({
          message: response.data.msg,
          type: "warning",
        });

        if (response.data.code === "1401") {
          router.push("/error");
        }
        return Promise.reject(response.data.msg);
      }
    },
    (err) => {
      loading.close();
      ElMessage({
        message: err.message,
        type: "warning",
      });
    }
);

export default function ({ url, method, ...config }, data) {
  method = method || "post";

  let sendKey = {
    post: "data",
    get: "params",
  };

  return axiosInstance({
    method: method || "post",
    [sendKey[method]]: data,
    url: url,
    ...config,
  });
}
