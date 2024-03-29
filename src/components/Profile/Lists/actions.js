import Config from '../../../api/config';
import axiosInstance from '../../../api/api.config';

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

  export const getLists = async (userId) => {
    try {
      const res = await axiosInstance.post(
        `${Config.API_END_POINT}/my_lists_with_user_id` , userId);
      return res;
    } catch (err) {
      throw err.response;
    }
  };

  export const getChallenges = async (userId) => {
    try {
      const res = await axiosInstance.post(
        `${Config.API_END_POINT}/my_challenges_with_user_id` , userId);
      return res;
    } catch (err) {
      throw err.response;
    }
  };
