'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Project, ProjectData, User } from "@api/models";
import { getProjectById, EditProject, DeleteEmployee } from "@services/projectsService";
import clsx from "clsx";
import { TrashIcon, UserIcon } from '@heroicons/react/24/outline';
import { formatDate } from "@utils/format";
import { getUsers } from "@services/userService";
import AddMemberModal from "@components/ui/projects/employee-add-form";
import LoadingIndicator from '@components/loadingIndicator';

const Page = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const router = useRouter();
    const [users, setUsers] = useState<User[] | undefined>([]);
    const [project, setProject] = useState<Project | null>(null);
    const [role, setRole] = useState<string>("Employee");
    const [activeNav, setActiveNav] = useState<string>("Overview");
    const [isCompleted, setIsCompleted] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [employees, setEmployees] = useState<User[] | undefined>([]);
    const [pageLoading, setPageLoading] = useState<boolean>(true);


    const closeModal = () => {
        setIsOpen(false);
    }
    const UpdatePage = () => {
        router.refresh();
    }

    const GetData = async () => {
        try {
            const userRole = localStorage.getItem('userRole');
            const projectInfo = await getProjectById(Number(id));

            const employeess = await getUsers();
            setUsers(projectInfo?.users || []);
            setProject(projectInfo?.project || null);
            setRole(userRole || "Employee");
            setIsCompleted(projectInfo?.project.isCompleted || false);
            setEmployees(employeess);
            setPageLoading(false)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        GetData();
    }, []);

    const handleDeleteUser = async (userId: string) => {
        try {
            const conf = confirm("Are you sure you want to delete this user?");
            if (!conf) return;
            DeleteEmployee(userId, Number(id));
            UpdatePage();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleEditProject = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const formData = new FormData(event.target as HTMLFormElement);
            const taskData: ProjectData = {
                name: formData.get('name') as string,
                description: formData.get('description') as string,
                userId: localStorage.getItem('userId') as string,
                isCompleted: isCompleted
            }
            await EditProject(Number(id), taskData);
            alert('Project edited successfully');
        } catch (error) {
            alert('Failed to edit poject. Please try again.');
            console.error('Failed to failed to edit poject:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddMember = () => {
        // TODO: Add logic to add member to project
        console.log("Add member");
    };

    const handleToggleChange = () => {
        setIsCompleted(!isCompleted);
        // setProject(prev => prev ? { ...prev, isCompleted: !isCompleted } : null);

    };

    return pageLoading ? (<LoadingIndicator />) : (
        <main className="w-full h-full">

            <div className="flex justify-between items-center border-b-2 md:flex-row flex-col">
                <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-5 mt-2 text-3xl">
                    <p className="inline">Project <span className="text-sky-500"> {project?.name} </span></p>
                </div>
                <div className="hidden w-1/2 md:flex md:justify-end">
                    <button
                        className="btnSecondary mr-5 inline"
                        onClick={()=> setIsOpen(true)}
                    >
                        <UserIcon className="h-5 mr-2 inline" />
                        Add member
                    </button>
                    
                    <button
                        className="btnPrimary inline"
                        onClick={() => router.back()}
                    >
                        Back
                    </button>
                </div>


                {/* Навигация для маленьких экранов */}
                <div className="w-full md:hidden">
                    <div className="flex text-gray-500">
                        {['Overview', 'Team'].map(nav => (
                            <button
                                key={nav}
                                className={clsx(
                                    "w-1/2 py-2 border-b font-bold",
                                    { ' text-sky-500 border-b-2 z-10 border-sky-500 ': activeNav === nav, '': activeNav !== nav }
                                )}
                                onClick={() => setActiveNav(nav)}
                            >
                                {nav}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 pb-4">
                {/* Таблица сотрудников, скрытая на маленьких экранах */}
                <div className={clsx("md:col-span-2", { "hidden md:block": activeNav === "Overview" })}>
                    <button
                        className="btnSecondary w-full flex items-center justify-center mb-5 md:hidden"
                        onClick={()=> setIsOpen(true)}
                    >
                        <UserIcon className="h-5 mr-2 inline" />
                        Add member
                    </button>
                    <div className="overflow-x-auto rounded-lg p-2 md:p-4 bg-gray-50 border">
                        <table className="min-w-full divide-y divide-gray-200 ">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Role
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:block">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 px-10 rounded-md">
                                {users?.map((user) => (
                                    <tr key={user.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{user.firstName} <span className="hidden md:inline">{user.lastName} </span></div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {user?.role &&
                                                (<div className="text-sm font-bold">
                                                    <span className={clsx({
                                                        "gold-animated": user?.role === 'Admin',
                                                        "magic-animated": user?.role === 'Manager',
                                                        "silver-animated": user?.role === 'Employee',
                                                    })}>
                                                        {user?.role}
                                                    </span>
                                                </div>)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap hidden md:inline">
                                            <div className="text-sm text-gray-900">{user.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                className="bg-red-400 p-2 text-white rounded-md hover:bg-red-500 flex items-center"
                                                onClick={() => handleDeleteUser(user.id)}
                                            >
                                                <TrashIcon className="h-5 w-5 mr-2" />
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Информация о проекте, скрытая на маленьких экранах */}
                <div className={clsx("bg-white p-6 rounded-lg border", { "hidden md:block": activeNav !== "Overview" })}>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-3 mb-5">Project Information</h2>
                    <form onSubmit={handleEditProject}>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <input
                                name="name"
                                id="name"
                                type="text"
                                defaultValue={project?.name}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                            <textarea
                                name="description"
                                id="description"
                                defaultValue={project?.description}
                                rows={4}
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Created Date</label>
                            <input
                                type="text"
                                defaultValue={formatDate(project?.createdDate as string)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                readOnly
                            />
                        </div>
                        <div className="mb-4">
                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={isCompleted} // привязываем состояние переключателя
                                    onChange={handleToggleChange} // обработчик изменения состояния
                                    className="sr-only peer"
                                />
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Completed</span>
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="btnSecondary w-full flex items-center justify-center"
                            disabled={isLoading}
                        >

                            {isLoading && (
                                <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                                </svg>
                            )}
                            {isLoading ? 'loading' : "Save Changes"}
                        </button>
                    </form>
                </div>
            </div>

            <AddMemberModal isOpen={isOpen} onClose={closeModal} onAddMember={UpdatePage} users={employees} projectId={Number(id)}  />
        </main>);
};

export default Page;