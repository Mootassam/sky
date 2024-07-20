import axios from "axios";
import authToken from "src/modules/auth/authToken";

const authAxios = axios.create({
  // Local link
  // baseURL: "http://localhost:8080/api",

  // louis Link
  // baseURL: "https://www.eclicks-digital.xyz/api/",

  // ENd LInk
  // baseURL: "http://172.104.141.32:8080/api",

  

  //Blade
  // baseURL: "http://172.104.153.191:8080/api",

  // SKY
  baseURL: 'https://gtbplatform.live/api',
  



});

authAxios.interceptors.request.use(async function (options) {
  const token = authToken.get();
  if (token) {
    options.headers["Authorization"] = `Bearer ${token}`;
  }

  return options;
});

export default authAxios;
