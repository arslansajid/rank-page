
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

export const getFollowedCategories = async (params) => {
  try {
    const res = await axiosInstance.post(
      `${Config.API_END_POINT}/category_followings`, params
    );
    return res;
  } catch (err) {
    throw err.response;
  }
};
