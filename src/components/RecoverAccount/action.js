import Config from '../../api/config';
import axiosInstance from '../../api/api.config';

export const forgotPassword = async userData => {
    try {
      const res = await axiosInstance.post(
        `${Config.API_END_POINT}/forgot_password`, userData
      );
      return res;
    } catch (err) {
      throw err.response;
    }
  };