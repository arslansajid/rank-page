import Config from '../../api/config';
import axiosInstance from '../../api/api.config';

export const UnBlockUser = async userData => {
  try {
    const res = await axiosInstance.post(
      `${Config.API_END_POINT}/unblock_user`, userData
    );
    return res;
  } catch (err) {
    throw err.response;
  }
};