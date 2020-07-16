import Config from '../../api/config';
import axiosInstance from '../../api/api.config';

export const signIn = async userData => {
    try {
      const res = await axiosInstance.post(
        `${Config.API_END_POINT}/login`, userData
      );
      return res;
    } catch (err) {
      throw err.response;
    }
  };