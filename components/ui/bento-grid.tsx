import { cn } from "@/utils/cn";
import Link from "next/link";
import {
    CheckIcon,
    ClockIcon,
  } from '@heroicons/react/24/outline';

export const BentoGrid = ({
    className,
    children,
    title,
    buttons,
}: {
    className?: string;
    children?: React.ReactNode;
    title?: string;
    buttons?: React.ReactNode;
}) => {
    return (
        <div className={cn(className, "px-3")}>
            <div className="flex justify-between items-center">
                <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-5 mt-2 text-3xl">
                    <span className="hover:text-sky-500">{title}</span>
                </div>
                {buttons}
            </div>
            <hr className="border-t border-neutral-300 dark:border-neutral-600 mb-10 mt-5" />
            <div
                className={cn(
                    "grid min-auto-rows-[18rem] grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl",
                )}
            >
                {children}
            </div>
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    date,
    description,
    isCompleted,
    header,
    projectId,
}: {
    className?: string;
    title?: string | React.ReactNode;
    date?: string | React.ReactNode;
    description?: string | React.ReactNode;
    isCompleted?: boolean;
    header?: React.ReactNode;
    projectId?: string;
}) => {
    return (
        <Link href={`/dashboard/projects/${projectId}/tasks`} passHref
            className={cn(
                "rounded-lg group/bento hover:bg-slate-50 transition duration-200 shadow-input bg-white border border-slate-200 flex flex-col",
                className
            )}
        >
            {header}
            <div className="px-5 pb-5 group-hover/bento:translate-x-2 transition duration-200 flex flex-col justify-between flex-1 mt-3 ">
                <div>
                    <div className="font-sans  text-neutral-600 dark:text-neutral-200 mb-2 ">
                        <span className="font-medium text-lg text-black ">{title} </span>
                        <hr className="border-t border-neutral-300 dark:border-neutral-600 mt-2" />
                    </div>
                    <div className="font-sans text-neutral-600 text-s dark:text-neutral-300 flex justify-between">
                        <span className="">Created date: </span>
                        <span className="font-medium">{date} </span>
                    </div>
                    <div className="font-sans font-normal text-neutral-600 text-s mt-3 dark:text-neutral-300">
                        <p className="font-medium">Description:</p>
                        {description}
                    </div>
                    <div className="font-sans font-normal text-s mt-3 dark:text-neutral-300">
                        {isCompleted ? (<p className="font-medium flex items-center text-green-500">Completed <CheckIcon className="h-5 w-5 ml-1" /></p>) :
                        (<p className="font-medium text-blue-500 flex items-center">In progress <ClockIcon className="h-5 w-5 ml-1" /></p>)}
                    </div>
                </div>
            </div>
        </Link>
    );
};