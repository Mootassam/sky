import axios from "axios";
import authToken from "src/modules/auth/authToken";

const authAxios = axios.create({
  baseURL: 'http://38.60.211.211:8080/api/',
});

authAxios.interceptors.request.use(async function (options) {
  const token = authToken.get();
  if (token) {
    options.headers["Authorization"] = `Bearer ${token}`;
  }

  return options;
});

export default authAxios;
