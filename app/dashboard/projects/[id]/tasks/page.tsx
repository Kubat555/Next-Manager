'use client';

import TasksTable from "@components/ui/tasks/table";


const Page = ({ params }: { params: { id: string } }) => {
    const { id } = params;
   

    return (
        <main className="w-full h-full">
            <div className="px-4 flex justify-between items-center">
                <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-5 mt-2 text-3xl">
                    <span className="hover:text-sky-500">Tasks</span>
                </div>
                
            </div>
            <TasksTable id={id} />
        </main>
    );
};

export default Page;
