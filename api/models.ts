export type LoginResponse = {
    isSuccess: boolean;
    message: string;
    statusCode: number;
    response: {
        token: string;
        userId: string;
        name: string;
        role: string;
    }
}

export type RegisterData = {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
}

export type ApiResponse<T> = {
    isSuccess: boolean;
    message: string;
    statusCode: number;
    response: T;
}

export type User = {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
    email: string;
  }

  export type UserData = {
    firstName: string;
    lastName: string;
  }

export type Project = {
    id: string;
    name: string;
    description: string;
    createdDate: string;
    isCompleted: boolean;
    employeeProjectId: number;
    employeeAddedDate: string;
}

export type ProjectData = {
    name: string;
    description: string;
    userId: string;
    isCompleted: boolean;
}

export type ProjectInfo = {
    project: Project;
    users: User[];
}

export type Task = {
    id: number;
    name: string;
    priorityId: number;
    priorityName: string;
    statusId: number;
    statusName: string;
    desciption: string;
    createdDate: string;
    deadline: string;
    executorId: string;
    executorName: string;
    projectId: number;
}

export type Tasks = {
    toDo: Task[];
    inProgress: Task[];
    done: Task[];
    tasksCount: number;
    completedTasksCount: number;
}

export type TaskData = {
    name: string;
    priorityId: number;
    statusId: number;
    createdDate: string;
    deadline: string;
    projectId: number;
    executorId: string;
    description: string;
}

export type Priority = {
    id: number;
    name: string;
}

export type Status = {
    id: number;
    name: string;
}

export type Role = {
    id: number;
    name: string;
}

export type UserStatistics = {
    countOfTasks: number;
    countOfCompletedTasks: number;
    countOfProjects: number;
    countOfFinishedProjects: number;
    countOfCompletedTaskInMonth: TasksMonth[];
    lastestTasks: TasksDataStatistics[];
}

export type TasksMonth = {
    year: string;
    month: string;
    completedTasks : number;
}

export type TasksDataStatistics = {
    id: number;
    name: string;
    priorityName : string;
    statusName: string;
    deadline: string;
    projectId: string;
    projectName: string;
}