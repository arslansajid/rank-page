import Config from '../../../api/config';
import axiosInstance from '../../../api/api.config';

export const getUserCategories = async (params) => {
  // console.log('get category function here' , params)
    try {
      const res = await axiosInstance.post(
        `${Config.API_END_POINT}/category_followings`, params
        );
      return res;
    } catch (err) {
      throw err.response;
    }
  };
