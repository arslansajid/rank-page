import Config from '../../../api/config';
import axiosInstance from '../../../api/api.config';

export const GetListItems = async () => {
    try {
      const res = await axiosInstance.get(
        `${Config.API_END_POINT}/list_items`);
      return res;
    } catch (err) {
      throw err.response;
    }
  };

  export const PostListItem = async (list_item) => {
    try {
      const res = await axiosInstance.get(
        `${Config.API_END_POINT}/create_list` , {list_item});
      return res;
    } catch (err) {
      throw err.response;
    }
  };