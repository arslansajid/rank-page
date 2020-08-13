
import Config from '../../api/config';
import axiosInstance from '../../api/api.config';

  export const getReportedUsers = async (data) => {
    try {
      const res = await axiosInstance.post(
        `${Config.API_END_POINT}/report_users_listing`, data);
      return res;
    } catch (err) {
      throw err.response;
    }
  };