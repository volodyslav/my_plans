
const Footer = () => {
  return (
    <footer className=" flex justify-center bg-yellow-800 text-white 
    focus:bg-yellow-600 hover:bg-yellow-600 active:hover:bg-yellow-400 p-4">
        <p>Copyright &copy; {new Date().getFullYear()}</p>
    </footer>
  )
}

export default Footer
