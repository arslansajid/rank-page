
import Config from '../../api/config';
import axiosInstance from '../../api/api.config';

export const getAllCategories = async () => {
  try {
    const res = await axiosInstance.get(
      `${Config.API_END_POINT}/all_categories_with_sub_categories`);
    return res;
  } catch (err) {
    throw err.response;
  }
};

export const GetListItems = async () => {
    try {
      const res = await axiosInstance.get(
        `${Config.API_END_POINT}/list_items`);
      return res;
    } catch (err) {
      throw err.response;
    }
  };

  export const PostListItem = async (params) => {
    try {
      const res = await axiosInstance.post(
        `${Config.API_END_POINT}/create_list` , params);
      return res;
    } catch (err) {
      throw err.response;
    }
  };

  export const getAllUsers = async () => {
    try {
      const res = await axiosInstance.get(
        `${Config.API_END_POINT}/all_users`
      );
      return res;
    } catch (err) {
      throw err.response;
    }
  };

