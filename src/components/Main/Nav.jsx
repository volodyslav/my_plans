import { Link } from "react-router-dom"

const Nav = ({search, setSearch}) => {


  return (
    <nav className=" sm:flex justify-between mx-auto bg-slate-800 text-white 
    focus:bg-slate-600 hover:bg-slate-600 active:hover:bg-slate-400
     z-20 sticky top-0 left-0 ">
        <form onSubmit={(e) => e.preventDefault()} className="sm:w-full p-4 ">
            <input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="search"
            placeholder="Search"
            type="search"
            className=" block w-full p-2 ps-10  text-2xl hover:bg-slate-950 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></input>
        </form>
        <div className="flex justify-evenly space-x-4 ">
            <Link className=" hover:bg-slate-950 p-4 pt-6 text-lg" to="/">Home</Link>
            <Link to="/posts" className=" hover:bg-slate-950 p-4 pt-6 text-lg">New</Link>
            <Link to="/about" className=" hover:bg-slate-950 p-4 pt-6 text-lg">About</Link>
            
        </div>
    
    </nav>
  )
}

export default Nav