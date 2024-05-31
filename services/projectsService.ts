import { fetchProjects } from "@api/data";



export const getProjects =  (userId: string) => {
    try {
      const data = fetchProjects(userId).then((res) => res.response);
      
      if(data === null) {
        return null;
      }

      return data;
    } 
    catch (error) {
      console.error('Failed to get projects:', error);
      return null;
    }
};