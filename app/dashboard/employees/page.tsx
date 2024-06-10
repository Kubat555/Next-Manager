'use client';

import { BentoGrid, BentoGridItem } from "@components/ui/bento-grid";
import { getProjects } from "@services/projectsService";
import { useEffect, useState } from "react";
import { Project, User } from "@api/models";
import { formatDate } from "@utils/format";
import ProjectCreateForm from "@components/ui/projects/project-create-form";
import LoadingIndicator from "@components/loadingIndicator";
import { Main } from "next/document";
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
          <p className="font-bold text-gray-400 text-2xl">No projects found... ^_^</p>
        ) :
        (<EmployeesTable employees={items} />)
      )}
    </main>
  );
}

export default Page;



