import React from 'react';
import clsx from 'clsx';
import {ClockIcon} from "@heroicons/react/24/outline";

interface DeadlineStatusProps {
    deadline: string;
}

const DeadlineStatus: React.FC<DeadlineStatusProps> = ({ deadline }) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);

    // Разница в миллисекундах
    const diffTime = deadlineDate.getTime() - today.getTime();
    // Разница в днях
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let statusText = '';
    let statusClass = '';

    if (diffDays > 0) {
        statusText = `Осталось ${diffDays} дней`;
        statusClass = 'bg-emerald-500 text-white p-2 rounded-md';
    } else if (diffDays === 0) {
        statusText = 'Сегодня';
        statusClass = 'bg-cyan-500 text-white p-2 rounded-md';
    } else {
        statusText = 'Истек';
        statusClass = 'bg-red-500 text-white p-2 rounded-md';
    }

    return (
        <span className={clsx('inline-flex items-center', statusClass)}>
            <ClockIcon className="w-5 h-5 mr-1" />
            {statusText}
        </span>
    );
};

export default DeadlineStatus;
