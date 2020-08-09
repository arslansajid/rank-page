import Config from '../../../api/config';
import axiosInstance from '../../../api/api.config';

  export const getChallenges = async (userId) => {
    try {
      const res = await axiosInstance.post(
        `${Config.API_END_POINT}/my_challenges_with_user_id` , userId);
      return res;
    } catch (err) {
      throw err.response;
    }
  };
