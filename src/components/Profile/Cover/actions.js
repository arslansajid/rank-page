import Config from '../../../api/config';
import axiosInstance from '../../../api/api.config';

export const getUserData = async (params) => {
  // console.log('get user by id called' , params)
  try {
    const res = await axiosInstance.get(
      `${Config.API_END_POINT}/get_user` , {params});
    return res;
  } catch (err) {
    throw err.response;
  }
};