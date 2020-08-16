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

export const reportUser = async (data) => {
  try {
    const res = await axiosInstance.post(
      `${Config.API_END_POINT}/report_user`, data
    );
    return res;
  } catch (err) {
    throw err.response;
  }
};

export const blockUser = async (data) => {
  try {
    const res = await axiosInstance.post(
      `${Config.API_END_POINT}/block_user`, data
    );
    return res;
  } catch (err) {
    throw err.response;
  }
};

export const unfollowUser = async (data) => {
  try {
    const res = await axiosInstance.post(
      `${Config.API_END_POINT}/unfollow_user`, data
    );
    return res;
  } catch (err) {
    throw err.response;
  }
};

export const followUser = async (params) => {
  try {
    const res = await axiosInstance.post(
      `${Config.API_END_POINT}/follow_user` , params);
    return res;
  } catch (err) {
    throw err.response;
  }
};