import axiosInstance from "./fetch.js";

import login from "@/api/login.js";

export const getLogin = (data) => axiosInstance(login.login, data);
