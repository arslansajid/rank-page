import Config from './config';
import axiosInstance from './api.config';
import Cookie from "js-cookie";

export const checkIfLoggedIn = async () => {
    const token = Cookie.get('rankpage_access_token')
    try {
      const res = await axiosInstance.get(
        `${Config.API_END_POINT}/signed_user`, {
            headers: {
              'Authorization': token
            }
          }
      );
      return res;
    } catch (err) {
      throw err.response;
    }
  };