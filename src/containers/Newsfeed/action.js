
import Config from '../../api/config';
import axiosInstance from '../../api/api.config';

  export const getNewsFeed = async () => {
    try {
      const res = await axiosInstance.get(
        `${Config.API_END_POINT}/news_feed`);
      return res;
    } catch (err) {
      throw err.response;
    }
  };