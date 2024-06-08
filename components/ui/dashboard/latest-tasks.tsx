import { TasksDataStatistics } from '@api/models';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import PriorityStatus from '../proirity';
import DeadlineStatus from '../deadline-status';
import Link from 'next/link';


const LatestTasks = ({tasks}: {tasks:TasksDataStatistics[]}) => {
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`mb-4 text-xl md:text-2xl`}>
        Latest Invoices
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        {/* NOTE: comment in this code when you get to this point in the course */}

        <div className="bg-white px-6">
          {tasks.map((task, i) => {
            return (
              <Link href={`/dashboard/projects/${task.projectId}/tasks`}
                key={task.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4 hover:bg-sky-100',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {task.name}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                        Project: {task.projectName}
                    </p>
                  </div>
                </div>
                <p
                  className={`truncate text-sm font-medium md:text-base`}
                >
                  <PriorityStatus priority={task.priorityName}/>
                </p>
                <p
                  className={`truncate text-sm font-medium md:text-base`}
                >
                  <DeadlineStatus deadline={task.deadline}/>
                </p>
                <p
                  className={`truncate text-sm font-medium md:text-base w-[85px] hidden lg:block`}
                >
                  {task.statusName}
                </p>
              </Link>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}


export default LatestTasks;