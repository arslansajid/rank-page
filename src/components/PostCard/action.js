import Config from '../../api/config';
import axiosInstance from '../../api/api.config';

export const LikeUnlikePost = async postData => {
    try {
      const res = await axiosInstance.post(
        `${Config.API_END_POINT}/like_post`, postData
      );
      return res;
    } catch (err) {
      throw err.response;
    }
};

export const sharePost = async postData => {
  try {
    const res = await axiosInstance.post(
      `${Config.API_END_POINT}/share_post`, postData
    );
    return res;
  } catch (err) {
    throw err.response;
  }
};