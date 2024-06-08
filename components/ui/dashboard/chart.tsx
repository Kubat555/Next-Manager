import { CalendarIcon } from '@heroicons/react/24/outline';
import { TasksMonth } from "@api/models";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Generate yAxis labels
const generateYAxis = (tasksMonth: TasksMonth[]) => {
  const maxTasks = Math.max(...tasksMonth.map(task => task.completedTasks));
  const yAxisLabels = new Set<number>();
  const steps = 5;

  for (let i = 0; i <= steps; i++) {
    const label = Math.round((maxTasks / steps) * i);
    yAxisLabels.add(label);
  }

  return { yAxisLabels: Array.from(yAxisLabels).sort((a, b) => b - a), topLabel: maxTasks };
};

export const ProjectPerMonthChart = ({ tasksMonth }: { tasksMonth: TasksMonth[] }) => {
  const chartHeight = 350;
  const { yAxisLabels, topLabel } = generateYAxis(tasksMonth);

  if (!tasksMonth || tasksMonth.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full md:col-span-4">
      <h2 className="mb-4 text-xl md:text-2xl">
        Completed Tasks Count Per Month ({currentYear})
      </h2>

      <div className="rounded-xl bg-gray-50 p-4">
        <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          <div
            className="mb-6 flex flex-col justify-between text-sm text-gray-400"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {tasksMonth.map((task) => (
            <div key={task.month} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-blue-300"
                style={{
                  height: `${(chartHeight / topLabel) * task.completedTasks}px`,
                }}
              ></div>
              <p className="text-sm text-gray-400 rotate-90 md:rotate-0 ">
                {monthNames[parseInt(task.month) - 1]}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500">Last months since the beginning of the year</h3>
        </div>
      </div>
    </div>
  );
}

export default ProjectPerMonthChart;
