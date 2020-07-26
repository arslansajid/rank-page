import Config from '../../../api/config';
import axiosInstance from '../../../api/api.config';

export const GetListItems = async () => {
    try {
      const res = await axiosInstance.get(
        `${Config.API_END_POINT}/follow_list_items`);
      return res;
    } catch (err) {
      throw err.response;
    }
    // axiosInstance.get(`${Config.API_END_POINT}/follow_list_items`).then
  };