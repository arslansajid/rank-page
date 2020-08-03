import Config from '../../api/config';
import axiosInstance from '../../api/api.config';

export const addComment = async postData => {
    try {
      const res = await axiosInstance.post(
        `${Config.API_END_POINT}/comment_on_post`, postData
      );
      return res;
    } catch (err) {
      throw err.response;
    }
};

export const replyToComment = async postData => {
  try {
    const res = await axiosInstance.post(
      `${Config.API_END_POINT}/reply_on_comment`, postData
    );
    return res;
  } catch (err) {
    throw err.response;
  }
};