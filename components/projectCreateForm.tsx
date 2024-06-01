"use client";
import Modal from "@components/ui/modal";
import { FC, useState } from "react";

import { PlusIcon } from '@heroicons/react/24/outline';
import { ProjectData } from "@api/models";
import { addNewProject } from "@services/projectsService";
import { useRouter } from "next/navigation";


interface ProjectCreateFormProps {
    onProjectAdded: () => void;
}

const ProjectCreateForm: FC<ProjectCreateFormProps> = ({ onProjectAdded }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                console.error('User ID not found');
                return;
            }
            const formData = new FormData(event.target as HTMLFormElement);
            const projectData: ProjectData = {
                name: formData.get('name') as string,
                description: formData.get('description') as string,
                userId: userId
            }
            console.log(projectData);

            const response = await addNewProject(projectData);
            console.log("response:", response);

            handleCloseModal();
            onProjectAdded();
        } catch (error) {
            console.error('Failed to create project:', error);
        }
    };

    return (
        <div className="">
            <button
                onClick={handleOpenModal}
                className="btnPrimary "
            >
                <PlusIcon className="w-5 h-5 mr-2 -ms-1" />
                <span>Create project</span>
            </button>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Create New Project">
                <form onSubmit={handleSubmit} className="p-4 md:p-5">
                    <div className="grid gap-4 mb-4 grid-cols-2">
                        <div className="col-span-2">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Type project name"
                                required
                            />
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                            <textarea
                                name="description"
                                id="description"
                                rows={4}
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Write project description here"
                            ></textarea>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="btnPrimary "
                    >
                        <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                        Add new project
                    </button>
                </form>
            </Modal>
        </div>
    );
}

export default ProjectCreateForm;
