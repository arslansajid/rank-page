
import Config from '../../api/config';
import axiosInstance from '../../api/api.config';

  export const getListById = async (data) => {
    try {
      const res = await axiosInstance.post(
        `${Config.API_END_POINT}/get_post_by_id`, data);
      return res;
    } catch (err) {
      throw err.response;
    }
  };