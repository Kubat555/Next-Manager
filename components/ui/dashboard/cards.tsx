import {
    BanknotesIcon,
    ClockIcon,
    UserGroupIcon,
    InboxIcon,
  } from '@heroicons/react/24/outline';
  
  const iconMap = {
    collected: BanknotesIcon,
    customers: UserGroupIcon,
    pending: ClockIcon,
    invoices: InboxIcon,
  };
  
  export const CardWrapper = ({
    taskCount,
    completedTasksCount,
    projectsCount,
    completedProjectsCount,
  }: {
    taskCount: number;
    completedTasksCount: number;
    projectsCount: number;
    completedProjectsCount: number;
  }) => {
    // console.log('CardWrapper props:', {
    //   taskCount,
    //   completedTasksCount,
    //   projectsCount,
    //   completedProjectsCount,
    // });
  
    return (
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        <Card title="Tasks Count" value={taskCount} type="collected" />
        <Card title="Completed Tasks Count" value={completedTasksCount} type="pending" />
        <Card title="Project Count" value={projectsCount} type="invoices" />
        <Card title="Completed Projects Count" value={completedProjectsCount} type="customers" />
      </div>
    );
  }
  
  export const Card = ({
    title,
    value,
    type,
  }: {
    title: string;
    value: number | string;
    type: 'invoices' | 'customers' | 'pending' | 'collected';
  }) => {
    const Icon = iconMap[type];
    // console.log(`Card (${title}) value:`, value);
    return (
      <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
        <div className="flex p-4">
          {Icon && <Icon className="h-5 w-5 text-gray-700" />}
          <h3 className="ml-2 text-sm font-medium">{title}</h3>
        </div>
        <p className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl">
          {value}
        </p>
      </div>
    );
  }
  