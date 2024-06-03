import clsx from 'clsx';
import React from 'react';

interface TaskFilterProps {
    activePriority: string;
    setActivePriority: (priority: string) => void;
    deadlineFilter: boolean;
    setDeadlineFilter: (filter: boolean) => void;
    activeStatus: string;
    setActiveStatus: (status: string) => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({
    activePriority,
    setActivePriority,
    deadlineFilter,
    setDeadlineFilter,
    activeStatus,
    setActiveStatus,
}) => {
    return (
        <div className="flex flex-col space-y-4 mb-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="w-full md:w-1/2">
                <div className="flex text-gray-500">
                    {['ToDo', 'InProgress', 'Done'].map(status => (
                        <button
                            key={status}
                            className={clsx(
                                "md:w-1/4 w-1/3 py-2 border-transparen border-b  font-bold",
                                { ' text-sky-500 border-b-2 border-sky-500 ': activeStatus === status, '  border-gray-200 hover:text-gray-600 hover:border-gray-300 hover:border-b-2': activeStatus !== status }
                            )}
                            onClick={() => setActiveStatus(status)}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>
            <div className="w-full md:w-1/4">
                <select
                    id="priority"
                    value={activePriority}
                    onChange={(e) => setActivePriority(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value="All">All priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>

            <div className="w-full md:w-1/4 flex items-center border border-gray-200 rounded dark:border-gray-700 p-2.5">
                <input
                    id="deadline-filter"
                    type="checkbox"
                    checked={deadlineFilter}
                    onChange={() => setDeadlineFilter(!deadlineFilter)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                    htmlFor="deadline-filter"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                    {deadlineFilter ? 'Deadline Passed' : 'All Deadlines'}
                </label>
            </div>
        </div>
    );
};

export default TaskFilter;
