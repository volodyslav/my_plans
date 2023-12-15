import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../../api/posts"
import { format } from "date-fns"
import { useNavigate } from "react-router-dom"

const EditPost = ({posts, setPosts}) => {
    const navigate = useNavigate()
    const {id} = useParams()
    const post = posts.find(post => (post.id).toString() === id)
    const [editTitle, setEditTitle] = useState("")
    const [editText, setEditText] = useState("")
    const [editAuthor, setEditAuthor] = useState("")
    const date = format(new Date(), "MM/dd/yyyy, hh:mm")

    const handleChangePost = async (id) => {
        const data = {id, title:editTitle, text:editText, date_added:date, author: editAuthor}
        try{
            const response = await api.put(`/posts/${id}`, data)
            setPosts(posts.map(post => (post.id).toString() === id ? {...response.data} : post))
            navigate(`/posts/${id}`)
        }catch(err){
            console.error(err.message)
        }
    } 

    useEffect(()=>{
        if(post){
            setEditTitle(post.title)
            setEditAuthor(post.author)
            setEditText(post.text)
        }
    }, [posts, setEditTitle, setEditText, setEditAuthor])

    return (
        <main>{ editTitle &&
            <div className=" flex justify-center mt-10">
                <form onSubmit={(e) => e.preventDefault()} className=" md:w-2/3 w-full flex flex-col space-y-4">
                    
                    <h1 className=" text-2xl text-center">Edit Post Page</h1>

                    <input
                        required
                        maxLength={10}
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        id="title"
                        placeholder="Title (10 letters)"
                        type="text"
                        className="shadow appearance-none border lg:hover:scale-110 hover:scale-105 duration-200 ease-in-out rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <textarea
                    required
                    value={editText}
                    id="text"
                    maxLength={200}
                    placeholder="Description (200 letters)"
                    onChange={(e) => setEditText(e.target.value)}
                    className="shadow appearance-none border lg:hover:scale-110 hover:scale-105 duration-200 ease-in-out rounded w-full py-2 px-3 h-20 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <input
                        required
                        value={editAuthor}
                        onChange={(e) => setEditAuthor(e.target.value)}
                        id="author"
                        maxLength={20}
                        placeholder="Author (20 letters)"
                        type="text"
                        className=" shadow appearance-none border rounded lg:hover:scale-110 hover:scale-105 duration-200 ease-in-out w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <button onClick={() => handleChangePost(id)} type="submit" className=" mx-auto rounded-lg hover:scale-110 duration-200 ease-in-out p-2 w-fit text-center bg-yellow-800 hover:bg-yellow-600 text-white">Change post</button>
                    
                </form>
            </div>}
            {!editTitle && <p>Cannot find it</p>}
        </main>
    )
}

export default EditPost