
const Header = ({title}) => {
  return (
    <header className=" text-center mx-auto bg-yellow-800 text-white 
    focus:bg-yellow-600 hover:bg-yellow-600 active:hover:bg-yellow-400
    p-4 ">
    {title}
    </header>
  )
}

export default Header
