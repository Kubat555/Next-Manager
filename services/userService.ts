


export const getUserData =  () => {
    try {
      const user = localStorage.getItem('userData');
      if(user !== null) {
        const s = JSON.parse(user);
        return s;
      }

      return null;
    } catch (error) {
      console.error('Failed to get user data:', error);
    }
};