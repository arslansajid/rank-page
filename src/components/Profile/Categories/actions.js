import Config from '../../../api/config';
import axiosInstance from '../../../api/api.config';

export const getUserCategories = async (params) => {
  // console.log('get category function here' , params)
    try {
      const res = await axiosInstance.get(
        `${Config.API_END_POINT}/get_category` , {
          params
        });
      return res;
    } catch (err) {
      throw err.response;
    }
  };
