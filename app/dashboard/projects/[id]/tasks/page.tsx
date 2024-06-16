'use client';

import TasksTable from "@components/ui/tasks/table";
import TaskCreateForm from "@components/ui/tasks/task-create-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Priority, Status, User } from "@api/models";
import { getPriorities, getProjectById, getStatuses } from "@services/projectsService";


const Page = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const router = useRouter();
    const [users, setUsers] = useState<User[] | undefined>([]);
    const [priorities, setPriorities] = useState<Priority[] | null>([]);
    const [statuses, setStatuses] = useState<Status[] | null>([]);
    const [role, setRole] = useState<string>("Employee");

    const UpdatePage = () => {
        router.refresh();
    }

    const GetData = async () => {
        try {
            const userRole = localStorage.getItem('userRole');
            const [project, prioritiez, statusez] = await Promise.all([getProjectById(Number(id)), getPriorities(), getStatuses()]);
            setUsers(project?.users || []);
            setPriorities(prioritiez);
            setStatuses(statusez);
            setRole(userRole || "Employee");
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        GetData();
    }, []);

    return (
        <main className="w-full h-full">
            <div className="px-4 flex justify-between items-center ">
                
                <div className="w-full">
                    {role !== "Employee" ? (
                        <div>
                                <TaskCreateForm projectId={Number(id)} onTaskAdded={UpdatePage} users={users} priorities={priorities} />
                        </div>
                    ) : (
                    <div className="hidden md:block font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-5 mt-2 text-3xl">
                        <span className="hover:text-sky-500">Tasks</span>
                    </div>
                )}

                </div>

            </div>
            <TasksTable id={id} users={users} priorities={priorities} statuses={statuses} role={role} />
        </main>
    );
};

export default Page;
