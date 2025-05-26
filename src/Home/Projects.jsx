import React from "react";
import { useGetProjectsQuery } from "../Features/Projects/ProjectsApi";

export default function Projects() {
  const { data: projects } = useGetProjectsQuery();
  console.log(projects);

  return (
    <div>
      <h3 className='text-xl font-bold'>Projects</h3>
      <div className='mt-3 space-y-4'>
        {projects &&
          projects?.length > 0 &&
          projects.map((project) => (
            <div className='checkbox-container'>
              <input type='checkbox' className={project?.colorClass} checked />
              <p className='label'>{project?.projectName}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
