import { addProject, fetchProjects } from "@api/data";
import { ProjectData } from "@api/models";



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

export const addNewProject =  (project: ProjectData) => {
  try {
    
    const data = addProject(project).then((res) => res);
    
    if(data === null) {
      return null;
    }

    return data;
  } 
  catch (error) {
    console.error('Failed to post project:', error);
    return null;
  }
};