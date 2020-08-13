import Config from '../../../api/config';
import axiosInstance from '../../../api/api.config';

export const followUser = async (params) => {
  try {
    const res = await axiosInstance.post(
      `${Config.API_END_POINT}/follow_user` , params);
    return res;
  } catch (err) {
    throw err.response;
  }
};