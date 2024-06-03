import { addProject, fetchAllTasks, fetchProjects, fetchTasks } from "@api/data";
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

export const getTasks =  async (projectId:number, userId: string) => {
  try {
    const data = await fetchTasks(projectId, userId);
    
    if( !data.isSuccess){
      console.error('Failed to get tasks:', data.message);
      return null;
    }

    return data.response;
  } 
  catch (error) {
    console.error('Failed to get tasks:', error);
    return null;
  }
};

export const getAllTasks =  async (projectId:number) => {
  try {
    const data = await fetchAllTasks(projectId);
    
    if( !data.isSuccess){
      console.error('Failed to get tasks:', data.message);
      return null;
    }

    return data.response;
  } 
  catch (error) {
    console.error('Failed to get tasks:', error);
    return null;
  }
};