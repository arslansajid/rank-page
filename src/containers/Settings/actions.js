
import Config from '../../api/config';
import axiosInstance from '../../api/api.config';


export const UpdateProfile = async (params) => {
  try {
    const res = await axiosInstance.put(
      `${Config.API_END_POINT}/update_profile` , params);
    return res;
  } catch (err) {
    throw err.response;
  }
};

export const UpdatePassword = async (params) => {
  try {
    const res = await axiosInstance.post(
      `${Config.API_END_POINT}/update_password` , params);
    return res;
  } catch (err) {
    throw err.response;
  }
};

export const EmailActivity = async (params) => {
  try {
    const res = await axiosInstance.post(
      `${Config.API_END_POINT}/update_email_availability` , params);
    return res;
  } catch (err) {
    throw err.response;
  }
};

export const AccountPrivacy = async (params) => {
  try {
    const res = await axiosInstance.post(
      `${Config.API_END_POINT}/update_account_privacy` , params);
    return res;
  } catch (err) {
    throw err.response;
  }
};

export const AccountStatus = async (params) => {
  try {
    const res = await axiosInstance.post(
      `${Config.API_END_POINT}/update_account_status` , params);
    return res;
  } catch (err) {
    throw err.response;
  }
};

