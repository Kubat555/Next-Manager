import { fetchUserData } from "@api/data";
import { User } from "@api/models";


export const getUserData = async (): Promise<User> => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) throw new Error('User ID not found in local storage');
      
      const userData = await fetchUserData(userId);
      return userData.response;
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      throw new Error('Failed to fetch user data');
    }
  };