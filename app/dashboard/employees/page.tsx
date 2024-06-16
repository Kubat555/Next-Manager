'use client';

import { useEffect, useState } from "react";
import {User } from "@api/models";
import LoadingIndicator from "@components/loadingIndicator";
import { getUsers } from "@services/userService";
import EmployeesTable from "@components/ui/employees/table";

const Page = () => {
  const [items, setItems] = useState<User[] | undefined>(undefined);


  const updateUsers = async ()=>{
    const users = await getUsers();
    setItems(users);
  }

  useEffect(() => {
    updateUsers();
  }, []);


  return (
    <main>
      {items === undefined ? (
        <LoadingIndicator/>
      ) : (
        (items.length === 0) ? (
          <p className="font-bold text-gray-400 text-2xl">No employees found... ^_^</p>
        ) :
        (<EmployeesTable update={updateUsers} employees={items} />)
      )}
    </main>
  );
}

export default Page;



