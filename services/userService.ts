import { fetchUserStatistic, fetchUsers } from "@api/data";
import { User, UserStatistics } from "@api/models";

export const getUserData = () => {
  try {
    const name = localStorage.getItem('userName');
    const role = localStorage.getItem('userRole');
    if (name !== null && role !== null) {
      const user = { name, role };
      return user;
    }

    return null;
  } catch (error) {
    console.error('Failed to get user data:', error);
  }
};


export const getUserStatistic = async (userId: string) => {
  try {
    const res = await fetchUserStatistic(userId);
    if (!res.isSuccess) {
      console.error('Failed to get user statistic:', res.message);
    }
    return res.response as UserStatistics;
  } catch (error) {
    console.error('Failed to get user statistic:', error);
  }
};

export const getUsers = async () => {
  try {
    const res = await fetchUsers();
    if (!res.isSuccess) {
      console.error('Failed to get users:', res.message);
    }
    return res.response as User[];
  } catch (error) {
    console.error('Failed to get users:', error);
  }
};