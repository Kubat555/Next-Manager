import React from 'react';
import clsx from 'clsx';

interface RoleProps {
    role: string;
}

const Role: React.FC<RoleProps> = ({ role }) => {
    return (
        <div className="text-md font-bold">
            <span
                className={clsx({
                    'gold-animated': role === 'Admin',
                    'magic-animated': role === 'Manager',
                    'silver-animated': role === 'Employee',
                })}
            >
                {role}
            </span>
        </div>
    );
};

export default Role;