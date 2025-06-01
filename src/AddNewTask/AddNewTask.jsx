import { useNavigate } from "react-router-dom";
import { useGetProjectsQuery } from "../Features/Projects/ProjectsApi";
import { useAddTaskMutation } from "../Features/Tasks/TasksApi";
import { useGetTeamQuery } from "../Features/Team/TeamApi";
import Navbar from "../Home/Navbar";
import { useState } from "react";

export default function AddNewTask() {
  const { data: teams } = useGetTeamQuery();
  const { data: projects } = useGetProjectsQuery();
  const [addTask] = useAddTaskMutation();
  const navigate = useNavigate();

  // State to track form inputs
  const [formData, setFormData] = useState({
    taskName: "",
    teamMember: "",
    projectName: "",
    deadline: "",
  });

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
      projectName: formData.projectName,
      deadline: formData.deadline,
    };

    // Call RTK mutation
    addTask(taskData);

    // Optional: Reset form
    setFormData({
      taskName: "",
      teamMember: "",
      projectName: "",
      deadline: "",
    });
    navigate("/");
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
                  value={formData.teamMember}
                  onChange={handleChange}
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
                  value={formData.projectName}
                  onChange={handleChange}
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
                  Save
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
