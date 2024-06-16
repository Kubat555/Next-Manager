'use client';
import { User } from "@api/models";
import Role from "@components/ui/animated-role";
import EditEmployeeModal from './../employees/employee-edit-form';
import { useState } from "react";
import {ShieldExclamationIcon} from '@heroicons/react/24/outline';

export default function EmployeesTable({
  employees: customers,
  update,
}: {
  employees: User[];
  update: () => void;
}) {
  const [user, setUser] = useState<User>();
  const [isOpen, setIsOpen] = useState<boolean>(false);


  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = (employee: User) => {
    setUser(employee);
    setIsOpen(true);
  };

  return (
    <div className="w-full">
      <h1 className={`mb-8 text-xl md:text-2xl font-sans font-bold text-neutral-600 dark:text-neutral-200 mt-2`}>
        Employees
      </h1>
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {customers?.map((customer) => (
                  <div
                    key={customer.id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <div className="flex items-center gap-3">
                            <p>{customer.firstName + " " + customer.lastName}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">
                          {customer.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between py-5">
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Role</p>
                        <div className="font-medium">{<Role role={customer.role} />}</div>
                      </div>
                      <div className="flex w-1/2 flex-col">
                        <button className="btnSecondary flex items-center justify-center" onClick={()=>{openModal(customer)}}>
                            <ShieldExclamationIcon className="w-5 h-5 mr-2" />
                            Edit role
                        </button>
                      </div>
                    </div>
                    {/* <div className="pt-4 text-sm">
                      <p>{customer.total_invoices} invoices</p>
                    </div> */}
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Role
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {customers.map((customer) => (
                    <tr key={customer.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <p>{customer.firstName + " " + customer.lastName}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {customer.email}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                         {customer?.role && (<Role role={customer.role} />)}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        <button className="btnSecondary flex items-center" onClick={()=>{openModal(customer)}}>
                          <ShieldExclamationIcon className="w-5 h-5 mr-2" />
                          Edit role
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <EditEmployeeModal isOpen={isOpen} onClose={closeModal} update={update} user={user}/>
    </div>
  );
}