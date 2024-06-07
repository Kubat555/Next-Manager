import { TasksMonth } from "@api/models";

export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };


  export const generateYAxis = (tasks: TasksMonth[]) => {
    // Calculate what labels we need to display on the y-axis
    // based on highest record and in 1000s
    const yAxisLabels = [];
    const highestRecord = Math.max(...tasks.map((task) => task.completedTasks));
    const topLabel = Math.ceil(highestRecord / 1000) * 1000;
  
    for (let i = topLabel; i >= 0; i -= 1000) {
      yAxisLabels.push(`$${i / 1000}K`);
    }
  
    return { yAxisLabels, topLabel };
  };