
import Config from '../../api/config';
import axiosInstance from '../../api/api.config';

  export const getNotifications = async (data) => {
    try {
      const res = await axiosInstance.post(
        `${Config.API_END_POINT}/notifications`, data);
      return res.data;
    } catch (err) {
      throw err.response;
    }
  };