'use client';

import TasksTable from "@components/ui/tasks/table";
import TaskCreateForm from "@components/ui/tasks/task-create-form";
import { useRouter } from "next/navigation";
import { getUsers } from "@services/userService";
import { useEffect, useState } from "react";
import { Priority, User } from "@api/models";
import { getPriorities } from "@services/projectsService";

const Page = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const router = useRouter();
    const [users, setUsers] = useState<User[] | undefined>([]);
    const [priorities, setPriorities] = useState<Priority[] | null>([]);
    const [role, setRole] = useState<string>("Employee");

    const UpdatePage = () => {
        router.refresh();
    }

    const GetData = async () => {
        try {
            const userRole = localStorage.getItem('userRole');
            if (userRole && userRole !== "Employee") {
                const [userz, prioritiez] = await Promise.all([getUsers(), getPriorities()]);
                setUsers(userz);
                setPriorities(prioritiez);
            } 
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
            <div className="px-4 flex justify-between items-center">
                <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-5 mt-2 text-3xl">
                    <span className="hover:text-sky-500">Tasks</span>
                </div>
                {role !== "Employee" ? (<TaskCreateForm projectId={id} onTaskAdded={UpdatePage} users={users} priorities={priorities} />) : (<></>)}

            </div>
            <TasksTable id={id} />
        </main>
    );
};

export default Page;
