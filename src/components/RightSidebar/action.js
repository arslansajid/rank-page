
import Config from '../../api/config';
import axiosInstance from '../../api/api.config';

  export const getTrending = async () => {
    try {
      const res = await axiosInstance.get(
        `${Config.API_END_POINT}/trending`);
      return res;
    } catch (err) {
      throw err.response;
    }
  };