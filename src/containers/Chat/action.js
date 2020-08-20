
import Config from '../../api/config';
import axiosInstance from '../../api/api.config';


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

  export const allConversations = async () => {
    try {
      const res = await axiosInstance.get(
        `${Config.API_END_POINT}/conversation_listing`);
      return res;
    } catch (err) {
      throw err.response;
    }
  };

  export const messageListing = async (params) => {
    try {
      const res = await axiosInstance.post(
        `${Config.API_END_POINT}/message_listing` , params);
      return res;
    } catch (err) {
      throw err.response;
    }
  };

  export const sendMessage = async (params) => {
    try {
      const res = await axiosInstance.post(
        `${Config.API_END_POINT}/send_message` , params);
      return res;
    } catch (err) {
      throw err.response;
    }
  };

  