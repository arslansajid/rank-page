import Config from '../../../api/config';
import axiosInstance from '../../../api/api.config';

export const getCategoriesWithSubCategories = async () => {
    try {
      const res = await axiosInstance.get(
        `${Config.API_END_POINT}/all_categories_with_sub_categories`);
      return res;
    } catch (err) {
      throw err.response;
    }
  };
