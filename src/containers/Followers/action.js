
import Config from '../../api/config';
import axiosInstance from '../../api/api.config';

  export const getFollowers = async (data) => {
    try {
      const res = await axiosInstance.get(
        `${Config.API_END_POINT}/user_followings_list`);
      return res;
    } catch (err) {
      throw err.response;
    }
  };