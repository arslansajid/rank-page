
import Config from '../../api/config';
import axiosInstance from '../../api/api.config';

  export const searchResults = async (data) => {
    try {
      const res = await axiosInstance.post(
        `${Config.API_END_POINT}/search`, data);
      return res;
    } catch (err) {
      throw err.response;
    }
  };