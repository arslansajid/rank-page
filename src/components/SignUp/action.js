import Config from '../../api/config';
import axiosInstance from '../../api/api.config';

export const signUp = async user => {
    try {
      const res = await axiosInstance.post(
        `${Config.API_END_POINT}/register`, {user}
      );
      return res;
    } catch (err) {
      throw err.response;
    }
  };