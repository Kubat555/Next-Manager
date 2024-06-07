'use client';

import { useEffect, useState } from 'react';
import { getTasks, getAllTasks } from '@services/projectsService';
import { Task, Tasks } from '@api/models';
import { formatDate } from '@utils/format';
import PriorityStatus from '@components/ui/proirity';
import DeadlineStatus from '../deadline-status';
import TaskFilter from './task-filter';
import LoadingIndicator from '@components/loadingIndicator';
import Link from 'next/link';


const TasksTable = ({ id }: { id: string }) => {
    const [tasks, setTasks] = useState<Tasks | null>(null);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
    const [activeStatus, setActiveStatus] = useState('ToDo');
    const [activePriority, setActivePriority] = useState('All');
    const [deadlineFilter, setDeadlineFilter] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const userId = localStorage.getItem('userId');
            const role = localStorage.getItem('userRole');

            if (!userId || !role) {
                console.error('User ID or role not found in localStorage');
                return;
            }

            let tasksData: Tasks | null;
            if (role === 'Employee') {
                tasksData = await getTasks(Number(id), userId);
            } else {
                tasksData = await getAllTasks(Number(id));
            }

            if (tasksData) {
                setTasks(tasksData);
                setFilteredTasks(tasksData.toDo);
                
            } 
            setLoading(false);
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        filterTasks();
    }, [activeStatus, activePriority, deadlineFilter, tasks]);

    const filterTasks = () => {
        if (!tasks) return;
        let currentTasks: Task[] = [];

        switch (activeStatus) {
            case 'ToDo':
                currentTasks = tasks.toDo;
                break;
            case 'InProgress':
                currentTasks = tasks.inProgress;
                break;
            case 'Done':
                currentTasks = tasks.done;
                break;
        }

        if (activePriority !== 'All') {
            currentTasks = currentTasks.filter(task => task.priorityName === activePriority);
        }

        if (deadlineFilter) {
            currentTasks = currentTasks.filter(task => new Date(task.deadline) < new Date());
        }

        setFilteredTasks(currentTasks);
    };

    return (
        <div className="p-4">

            <TaskFilter
                activePriority={activePriority}
                setActivePriority={setActivePriority}
                deadlineFilter={deadlineFilter}
                setDeadlineFilter={setDeadlineFilter}
                activeStatus={activeStatus}
                setActiveStatus={setActiveStatus}
            />

            <div className="mt-6 flow-root">
                {loading ? (<LoadingIndicator />) :
                    filteredTasks.length === 0 ?
                        (<div className='font-bold text-gray-400 text-2xl'><p>No tasks found.... ^_^</p></div>) : (
                            <div className="inline-block min-w-full align-middle">
                                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                                    <div className="md:hidden">
                                        {filteredTasks?.map((task) => (
                                            <div
                                                key={task.id}
                                                className="mb-2 w-full rounded-md bg-white p-4 hover:bg-sky-100"
                                            >
                                                <div className="flex items-center justify-between border-b pb-4">
                                                    <div>
                                                        <div className="mb-2 flex items-center">
                                                            {/* <Image
                        src={task.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${task.name}'s profile picture`}
                      /> */}
                                                            <p>{task.name}</p>
                                                        </div>
                                                        <p className="text-sm text-gray-500">{formatDate(task.createdDate)}</p>
                                                    </div>
                                                    <PriorityStatus priority={task.priorityName} />
                                                </div>
                                                <div className="flex w-full items-center justify-between pt-4">
                                                    <div>
                                                        <p className="text-md mb-5">
                                                            <DeadlineStatus deadline={task.deadline} />
                                                        </p>
                                                        <p>{task.executorName}</p>
                                                    </div>
                                                    <div className="flex justify-end gap-2">
                                                        {/* <UpdateInvoice id={task.id} />
                    <DeleteInvoice id={task.id} /> */}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <table className="hidden min-w-full text-gray-900 md:table">
                                        <thead className="rounded-lg text-left text-sm font-normal">
                                            <tr>
                                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                                    Name
                                                </th>
                                                <th scope="col" className="px-3 py-5 font-medium">
                                                    Created date
                                                </th>
                                                <th scope="col" className="px-3 py-5 font-medium">
                                                    Deadline
                                                </th>
                                                <th scope="col" className="px-3 py-5 font-medium">
                                                    Executor
                                                </th>
                                                <th scope="col" className="px-3 py-5 font-medium">
                                                    Proirity
                                                </th>
                                                <th scope="col" className="relative py-3 pl-6 pr-3">
                                                    <span className="sr-only">Edit</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white">
                                            {filteredTasks?.map((task) => (

                                                <tr
                                                    key={task.id}
                                                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg hover:bg-sky-100 cursor-pointer"
                                                    onClick={() => {console.log('bankai')}}
                                                >
                                                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                                            <div className="flex items-center gap-3">
                                                                {/* <Image
                        src={task.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${task.name}'s profile picture`}
                      /> */}
                                                                <p>{task.name}</p>
                                                            </div>
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-3">
                                                            {formatDate(task.createdDate)}
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-3">
                                                            <DeadlineStatus deadline={task.deadline} />
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-3">
                                                            {task.executorName}
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-3">
                                                            <PriorityStatus priority={task.priorityName} />
                                                        </td>
                                                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                                            <div className="flex justify-end gap-3">
                                                                {/* <UpdateInvoice id={task.id} />
                      <DeleteInvoice id={task.id} /> */}
                                                            </div>
                                                        </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
            </div>
        </div>
    );
};

export default TasksTable;
