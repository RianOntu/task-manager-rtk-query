import { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import Navbar from "./Home/Navbar";
import Projects from "./Home/Projects";
import TeamMember from "./Home/TeamMember";
import Tasks from "./Home/Tasks";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProjects, setSelectedProjects] = useState([]);

  return (
    <div className='text-[#111827]'>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className='container relative'>
        <div className='sidebar'>
          <Projects
            selectedProjects={selectedProjects}
            setSelectedProjects={setSelectedProjects}
          />
          <TeamMember />
        </div>

        <div className='lg:pl-[16rem] 2xl:pl-[23rem]'>
          <main className='relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none'>
            <div className='justify-between mb-10 space-y-2 md:flex md:space-y-0'>
              <Link to='/add-new-task' className='lws-addnew group'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-6 h-6 group-hover:text-indigo-500'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 4.5v15m7.5-7.5h-15'
                  />
                </svg>

                <span className='group-hover:text-indigo-500'>Add New</span>
              </Link>
            </div>

            <Tasks
              searchTerm={searchTerm}
              selectedProjects={selectedProjects}
            />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
