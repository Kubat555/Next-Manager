"use client";
import { CardWrapper } from '@components/ui/dashboard/cards';
import { useEffect, useState } from 'react';
import { UserStatistics } from '@api/models';
import { getUserStatistic } from '@services/userService';
import ProjectPerMonthChart from '@components/ui/dashboard/chart';
import LatestTasks from '@components/ui/dashboard/latest-tasks';
import LoadingIndicator from '@components/loadingIndicator';

const Page = () => {
  const [statistic, setStatistic] = useState<UserStatistics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadStatistic = async () => {
      const userId = localStorage.getItem('userId');
      if (userId === null) {
        return;
      }
      const res = await getUserStatistic(userId);
      if (res) {
        setStatistic(res);
      }
      setLoading(false);
    };

    loadStatistic();
  }, []);

  return (
    <main>
      <h1 className={`mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          {statistic && (
            <div className="">
              <CardWrapper
                taskCount={statistic.countOfTasks}
                completedTasksCount={statistic.countOfCompletedTasks}
                projectsCount={statistic.countOfProjects}
                completedProjectsCount={statistic.countOfFinishedProjects}
              />
            </div>
          )}
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
            {statistic && (
              <ProjectPerMonthChart tasksMonth={statistic?.countOfCompletedTaskInMonth} />
            )}
            {statistic && (
              <LatestTasks tasks={statistic?.lastestTasks} />
            )}
          </div>
        </>
      )}
    </main>
  );
}

export default Page;
