import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import api from "../../api/posts"

const ShowPost = ({posts, setPosts}) => {

    // id from home page and app, id is an abject
    const {id} = useParams()
    const post = posts.find(post => (post.id).toString() === id)
    const navigate = useNavigate()

    // logic for deletion and editing 
    const [deletePost, setDeletePost] = useState(false)


    const handleDeleteShow = () => {
        try{
            setDeletePost(true)
        }catch(err){
            console.log(err.message)
        }
    }

    const handleDeleteNo = () => {
        try{
            setDeletePost(false)
        }catch(err){
            console.log(err.message)
        }
    }

    const handleDelete = async () => {
        try{
            await api.delete(`/posts/${id}`)
            const deletedData = posts.filter((post) => (post.id).toString() !== id)
            setPosts([...deletedData])
            setDeletePost(false)
            navigate("/")
        }catch(err){
            console.error(err.message)
        }
    }

    return (
        <main>
        {post ? (<>
            <div className="relative z-0 space-y-10  border shadow-lg sm:hover:scale-105 my-10 md:w-3/4  mx-auto lg:hover:scale-110 ease-in-out duration-200 border-gray-400 p-10 rounded-lg">
                    <p className="text-center break-words">{post.title}</p>
                    <p className="  break-words"  >{post.text}</p>
                    <div className={`absolute border rounded-lg top-2 text-center flex justify-center  md:right-28 lg:right-52 p-4 bg-white z-20 ${!deletePost ? "hidden " : "animate-pulse"}`}>
                        <p>Are you sure want to delete it?</p>
                        <button className="bg-red-700 focus:bg-red-500 hover:bg-red-500 text-white p-2 rounded-lg hover:scale-110 duration-200 ease-in-out mx-2" onClick={handleDelete}>Yes</button>
                        <button className="bg-yellow-700 focus:bg-yellow-500 hover:bg-yellow-500 text-white p-2 rounded-lg hover:scale-110 duration-200 ease-in-out" onClick={handleDeleteNo}>No</button>
                    </div>
                    <div className=" flex justify-center space-x-4 ">
                        <button onClick={handleDeleteShow} className=" bg-red-700 hover:bg-red-500 text-white p-2 rounded-lg hover:scale-110 duration-200 ease-in-out">Delete</button>
                        <Link to={`/edit/${id}`}><button className=" bg-yellow-700 hover:bg-yellow-500 text-white p-2 rounded-lg hover:scale-110 duration-200 ease-in-out">Edit</button></Link>
                    </div>
                    <div className=" flex justify-evenly text-sm text-gray-500 ">
                        <p className=" break-words">{post.date_added}</p>
                        <p className=" break-words">{post.author}</p>
                    </div>
                    
                </div><Link className=" flex justify-center w-fit mt-10 mx-auto text-blue-500 hover:text-blue-800" to={"/"}>Back to Home</Link></>):<p>Sorry we could not find this ... <Link to={"/"}>Back to Home</Link></p>
                }
        </main>
    )
}

export default ShowPost