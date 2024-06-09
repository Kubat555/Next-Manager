import { addEmployeeToProject, addProject, addTask, deleteEmployeeFromProject, deleteTask, fetchAllTasks, fetchPriorities, fetchProjectById, fetchProjects, fetchStatuses, fetchTasks, updateProject, updateTask } from "@api/data";
import { ProjectData, TaskData } from "@api/models";



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

export const getProjectById =  async (projectId:number) => {
  try {
    const data = await fetchProjectById(projectId);
    
    if( !data.isSuccess){
      console.error('Failed to get project info by ID:', data.message);
      return null;
    }

    return data.response;
  } 
  catch (error) {
    console.error('Failed to get project info by ID:', error);
    return null;
  }
};

export const EditProject =  async (projectId:number, projectData: ProjectData) => {
  try {
    const data = await updateProject(projectId, projectData);
    
    if( !data.isSuccess){
      console.error('Failed to edit project:', data.message);
      return null;
    }

    return data.response;
  } 
  catch (error) {
    console.error('Failed to edit project:', error);
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

export const AddNewTask =  async (taskData: TaskData) => {
  try {
    const data = await addTask(taskData);
    
    if( !data.isSuccess){
      console.error('Failed to add task:', data.message);
      return null;
    }

    return data.response;
  } 
  catch (error) {
    console.error('Failed to add task:', error);
    return null;
  }
};

export const getPriorities =  async () => {
  try {
    const data = await fetchPriorities();
    
    if( !data.isSuccess){
      console.error('Failed to get priorities:', data.message);
      return null;
    }

    return data.response;
  } 
  catch (error) {
    console.error('Failed to get priorities:', error);
    return null;
  }
};

export const getStatuses =  async () => {
  try {
    const data = await fetchStatuses();
    
    if( !data.isSuccess){
      console.error('Failed to get statuses:', data.message);
      return null;
    }

    return data.response;
  } 
  catch (error) {
    console.error('Failed to get statuses:', error);
    return null;
  }
};

export const EditTask =  async (taskId:number, taskData: TaskData) => {
  try {
    const data = await updateTask(taskId, taskData);
    
    if( !data.isSuccess){
      console.error('Failed to edit task:', data.message);
      return null;
    }

    return data.response;
  } 
  catch (error) {
    console.error('Failed to edit task:', error);
    return null;
  }
};

export const DeleteTask =  async (taskId:number) => {
  try {
    const data = await deleteTask(taskId);
    
    if( !data.isSuccess){
      console.error('Failed to delete task:', data.message);
      return null;
    }

    return data.response;
  } 
  catch (error) {
    console.error('Failed to delete task:', error);
    return null;
  }
};


export const AddEmployee =  async (userId: string, projectId: number) => {
  try {
    const data = await addEmployeeToProject(userId, projectId);
    
    if( !data.isSuccess){
      console.error('Failed to add employee in project:', data.message);
      return null;
    }

    return data.response;
  } 
  catch (error) {
    console.error('Failed to add employee in project:', error);
    return null;
  }
};

export const DeleteEmployee =  async (userId: string, projectId: number) => {
  try {
    const data = await deleteEmployeeFromProject(userId, projectId);
    
    if( !data.isSuccess){
      console.error('Failed to delete employee in project:', data.message);
      return null;
    }

    return data.response;
  } 
  catch (error) {
    console.error('Failed to delete employee in project:', error);
    return null;
  }
};