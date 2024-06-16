'use client';

import { BentoGrid, BentoGridItem } from "@components/ui/bento-grid";
import Image from "next/image";
import ProjImage from "@public/proj-img.jpg";
import { getProjects } from "@services/projectsService";
import { useEffect, useState } from "react";
import { Project } from "@api/models";
import { formatDate } from "@utils/format";
import ProjectCreateForm from "@components/ui/projects/project-create-form";
import LoadingIndicator from "@components/loadingIndicator";

const Page = () => {
  const [items, setItems] = useState<Project[] | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const loadProjects  =  () => {
    const userId = localStorage.getItem('userId');
    const rol = localStorage.getItem('userRole');
    if (userId === null) {
      return;
    }
    getProjects(userId)?.then((projects) => {
      setItems(projects);
    });
    setRole(rol);
  };

  useEffect(() => {
    loadProjects ();
  }, []);

   


  return (
    <BentoGrid className="max-w-7xl mx-auto" title={"Project"} buttons={<ProjectCreateForm onProjectAdded={loadProjects } role={role} />}>
      {items === null ? (
        <LoadingIndicator/>
      ) : (
        (items.length === 0) ? (
          <p className="font-bold text-gray-400 text-2xl">No projects found... ^_^</p>
        ) :
        items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.name}
            description={item.description}
            header={<Skeleton />}
            date={formatDate(item.createdDate)}
            projectId={item.id}
            className=""
          />
        ))
      )}
    </BentoGrid>
  );
}

export default Page;

const Skeleton = () => (
  <div className="rounded-t-lg h-2 w-full bg-sky-100">
  </div>
);


