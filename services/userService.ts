
export const getUserData =  () => {
    try {
      const name = localStorage.getItem('userName');
      const role = localStorage.getItem('userRole');
      if(name !== null && role !== null) {
        const user = {name, role};
        return user;
      }

      return null;
    } catch (error) {
      console.error('Failed to get user data:', error);
    }
};