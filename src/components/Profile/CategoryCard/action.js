import Config from '../../../api/config';
import axiosInstance from '../../../api/api.config';

export const followCategory = async data => {
    try {
      const res = await axiosInstance.post(
        `${Config.API_END_POINT}/category_toggle_following`, data
      );
      return res;
    } catch (err) {
      throw err.response;
    }
  };