'use client';

import { BentoGrid, BentoGridItem } from "@components/ui/bento-grid";
import Image from "next/image";
import ProjImage from "@public/proj-img.jpg";
import { getProjects } from "@services/projectsService";
import { useEffect, useState } from "react";
import { Project } from "@api/models";
import { formatDate } from "@utils/format";

const Page = () => {
  const [items, setItems] = useState<Project[] | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId === null) {
      return;
    }
    getProjects(userId)?.then((projects) => {
      setItems(projects);
    });
  }, []);


  return (
    <BentoGrid className="max-w-7xl mx-auto" title="Projects">
      {items === null ? (
        <p>Проектов нет</p>
      ) : (
        items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.name}
            description={item.description}
            header={<Skeleton />}
            date={formatDate(item.createdDate)}
            className=""
          />
        ))
      )}
    </BentoGrid>
  );
}

export default Page;

const Skeleton = () => (
  <Image src={ProjImage}
    alt="Project Image"
    width={400}
    height={400}
    className="rounded-md"
  />
);
