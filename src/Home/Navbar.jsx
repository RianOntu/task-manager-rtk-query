import { Link } from "react-router-dom";

export default function Navbar({ searchTerm, setSearchTerm }) {
  return (
    <nav className='container relative py-3'>
      <div className='flex items-center justify-between'>
        <Link to='/'>
          <img src='/logo.svg' />
        </Link>
        <div className='flex-1 max-w-xs search-field group'>
          <i className='fa-solid fa-magnifying-glass search-icon '></i>
          <input
            type='text'
            placeholder='Search Task'
            className='search-input'
            id='lws-searchTask'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
    </nav>
  );
}
