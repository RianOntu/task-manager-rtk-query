import { useGetProjectsQuery } from "../Features/Projects/ProjectsApi";

export default function Projects({ selectedProjects, setSelectedProjects }) {
  const { data: projects } = useGetProjectsQuery();

  const handleChange = (e, projectName) => {
    if (e.target.checked) {
      setSelectedProjects([...selectedProjects, projectName]);
    } else {
      setSelectedProjects(
        selectedProjects.filter((name) => name !== projectName)
      );
    }
  };

  return (
    <div>
      <h3 className='text-xl font-bold'>Projects</h3>
      <div className='mt-3 space-y-4'>
        {projects?.map((project) => {
          const projectName = project.projectName;
          return (
            <div key={project.id} className='checkbox-container'>
              <input
                type='checkbox'
                className={project.colorClass}
                checked={selectedProjects.includes(projectName)}
                onChange={(e) => handleChange(e, projectName)}
              />
              <p className='label'>{projectName}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
