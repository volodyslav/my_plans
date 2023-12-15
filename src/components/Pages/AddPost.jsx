import {format, formatDistance} from "date-fns"
import { useState} from "react"
import api from "../../api/posts"
import { useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"


const AddPost = ({posts, setPosts}) => {
    const navigate = useNavigate()
    const [newTitle, setNewTitle] = useState("") 
    const [newText, setNewText] = useState("") 
    const [newAuthor, setNewAuthor] = useState("") 
    const id = uuidv4()
    const date = format(new Date(), "MM/dd/yyyy, hh:mm")
    
    const handleSubmitNew = async (e) => {
        e.preventDefault();
        try{
            const data = {id, title: newTitle, text: newText, date_added: date, author: newAuthor}
            const response = await api.post("/posts", data)
            setPosts([...posts, response.data])
            setNewTitle("")
            setNewText("")
            setNewAuthor("")
            navigate("/")
        }catch(err){
            console.error(err.message)
            console.error(err.response.data);  // Log the response data
            console.error(err.response.status); 
        }
    }

    return (
        <main>
            <div className=" flex justify-center mt-10">
                <form onSubmit={handleSubmitNew} className=" md:w-2/3 w-full flex flex-col space-y-4">
                    
                    <h1 className=" text-2xl text-center">Add New Post Page</h1>

                    <input
                        required
                        maxLength={10}
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        id="title"
                        placeholder="Title (10 letters)"
                        type="text"
                        className="shadow appearance-none border lg:hover:scale-110 hover:scale-105 duration-200 ease-in-out rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <textarea
                    required
                    value={newText}
                    id="text"
                    maxLength={200}
                    placeholder="Description (200 letters)"
                    onChange={(e) => setNewText(e.target.value)}
                    className="shadow appearance-none border lg:hover:scale-110 hover:scale-105 duration-200 ease-in-out rounded w-full py-2 px-3 h-20 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <input
                        required
                        value={newAuthor}
                        onChange={(e) => setNewAuthor(e.target.value)}
                        id="author"
                        maxLength={20}
                        placeholder="Author (20 letters)"
                        type="text"
                        className=" shadow appearance-none border rounded lg:hover:scale-110 hover:scale-105 duration-200 ease-in-out w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <button type="submit" className=" mx-auto rounded-lg hover:scale-110 duration-200 ease-in-out p-2 w-fit text-center bg-yellow-800 hover:bg-yellow-600 text-white">Add new post</button>
                    
                </form>
            </div>
        </main>
    )
}

export default AddPost