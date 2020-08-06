
import Config from '../../api/config';
import axiosInstance from '../../api/api.config';


  export const UpdateProfile = async (params) => {
    try {
      const res = await axiosInstance.put(
        `${Config.API_END_POINT}/update_profile` , params);
      return res;
    } catch (err) {
      throw err.response;
    }
  };