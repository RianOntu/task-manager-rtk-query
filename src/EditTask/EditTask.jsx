import { useNavigate, useParams } from "react-router-dom";
import { useGetProjectsQuery } from "../Features/Projects/ProjectsApi";
import {
  useGetTasksQuery,
  useUpdateTaskMutation,
} from "../Features/Tasks/TasksApi";
import { useGetTeamQuery } from "../Features/Team/TeamApi";
import Navbar from "../Home/Navbar";
import { useEffect, useState } from "react";

export default function EditTask() {
  const [taskToEdit, setTaskToEdit] = useState({});
  const { data: teams } = useGetTeamQuery();
  const { data: projects } = useGetProjectsQuery();
  const { data: tasks } = useGetTasksQuery();
  const [updateTask] = useUpdateTaskMutation();
  const { id } = useParams();

  useEffect(() => {
    if (tasks && id) {
      const task = tasks.find((task) => task.id == id);
      setTaskToEdit(task);

      // Optional: also update form data when task is fetched
      setFormData({
        taskName: task?.taskName || "",
        teamMember: task?.teamMember || null,
        project: task?.project || null,
        deadline: task?.deadline || "",
      });
    }
  }, [tasks, id]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    taskName: taskToEdit?.taskName,
    teamMember: taskToEdit?.teamMember,
    project: taskToEdit?.project,
    deadline: taskToEdit?.deadline,
  });

  const handleProjectChange = (e) => {
    const selectedProjectName = e.target.value;
    const selectedProject = projects.find(
      (p) => p.projectName === selectedProjectName
    );
    setFormData({ ...formData, project: selectedProject });
  };

  // Update the team member select handler similarly if needed
  const handleTeamMemberChange = (e) => {
    const selectedMemberName = e.target.value;
    const selectedMember = teams.find((m) => m.name === selectedMemberName);
    setFormData({ ...formData, teamMember: selectedMember });
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const taskData = {
      taskName: formData.taskName,
      teamMember: formData.teamMember, 
      project: formData.project, 
      deadline: formData.deadline,
    };

    updateTask({ id: id, data: taskData })
      .unwrap()
      .then(() => {
        setFormData({
          taskName: "",
          teamMember: null,
          project: null,
          deadline: "",
        });
        navigate("/");
      })
      .catch((error) => {
        console.error("Failed to update task:", error);
      });
  };

  return (
    <div className='text-[#111827]'>
      <Navbar />
      <div className='container relative'>
        <main className='relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none'>
          <h1 className='mt-4 mb-8 text-3xl font-bold text-center text-gray-800'>
            Create Task for Your Team
          </h1>

          <div className='justify-center mb-10 space-y-2 md:flex md:space-y-0'>
            <form className='space-y-6' onSubmit={handleSubmit}>
              <div className='fieldContainer'>
                <label htmlFor='lws-taskName'>Task Name</label>
                <input
                  type='text'
                  name='taskName'
                  id='lws-taskName'
                  required
                  placeholder='Implement RTK Query'
                  value={formData.taskName}
                  onChange={handleChange}
                />
              </div>

              <div className='fieldContainer'>
                <label>Assign To</label>
                <select
                  name='teamMember'
                  id='lws-teamMember'
                  required
                  value={formData.teamMember?.name || ""}
                  onChange={handleTeamMemberChange}
                >
                  <option value='' hidden>
                    Select Job
                  </option>
                  {teams &&
                    teams.map((team) => (
                      <option key={team?.id} value={team?.name}>
                        {team?.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className='fieldContainer'>
                <label htmlFor='lws-projectName'>Project Name</label>
                <select
                  id='lws-projectName'
                  name='projectName'
                  required
                  value={formData.project?.projectName || ""}
                  onChange={handleProjectChange}
                >
                  <option value='' hidden>
                    Select Project
                  </option>
                  {projects &&
                    projects.map((project) => (
                      <option key={project?.id} value={project?.projectName}>
                        {project?.projectName}
                      </option>
                    ))}
                </select>
              </div>

              <div className='fieldContainer'>
                <label htmlFor='lws-deadline'>Deadline</label>
                <input
                  type='date'
                  name='deadline'
                  id='lws-deadline'
                  required
                  value={formData.deadline}
                  onChange={handleChange}
                />
              </div>

              <div className='text-right'>
                <button type='submit' className='lws-submit'>
                  Update
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
