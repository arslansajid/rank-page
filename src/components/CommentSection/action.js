import Config from '../../api/config';
import axiosInstance from '../../api/api.config';

export const getComments = async postData => {
  try {
    const res = await axiosInstance.post(
      `${Config.API_END_POINT}/comments_listing`, postData
    );
    return res;
  } catch (err) {
    throw err.response;
  }
};

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

export const likeComment = async commentData => {
  try {
    const res = await axiosInstance.post(
      `${Config.API_END_POINT}/like_comment`, commentData
    );
    return res;
  } catch (err) {
    throw err.response;
  }
};