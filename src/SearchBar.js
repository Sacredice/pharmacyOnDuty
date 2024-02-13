import { FaSearch } from "react-icons/fa"

function SearchBar({ search, setSearch }) {
    

  return (
    <nav className="Nav">
      <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
          <input 
              className="searchBar"
              type="text" 
              placeholder='Listede Ara'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              />
          <button>
              <FaSearch className="searchIcon" />
          </button>
      </form>
    </nav>
  )
}

export default SearchBar
