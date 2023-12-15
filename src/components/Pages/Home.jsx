import { useEffect, useRef, useState } from "react"
import api from "../../api/posts"
import { Link } from "react-router-dom"

const Home = ({posts, setPosts}) => {
    const [amountPosts, setAmountPosts] = useState(10)
    const [isLoading, setIsLoading] = useState(true)
    const [isExtraLoading, setIsExtraLoading] = useState(false)
    

    const fetchData = async () => {
        try{
            const response = await api.get("/posts") 
            const data = response.data
            const dataReverse = data.reverse()
            setIsLoading(false)
            setPosts(dataReverse)
        }catch(err){
            console.error(err.message)
        }
    }

    const handleMorePosts = () => {
        try{
            setIsExtraLoading(true)
            setTimeout(()=>{
                setAmountPosts(amount => amount += 5);
                setIsExtraLoading(false);
            }, 1000)
            
        }catch(err){
            console.error(err)
        }
    }

    useEffect(()=>{
        setTimeout(() => {
            fetchData()
        }, 1000)
    }, [])
  
    return (
    <main>
     {isLoading && 
            <button disabled type="button" className="text-white bg-yellow-700 flex  justify-center mx-auto hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800 ">
                                <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                </svg>
                            Loading...
                            </button>}
        <div className=" mx-10 grid gap-6 sm:grid-cols-3  lg:grid-cols-4  place-content-center">
           
            {!isLoading && posts ? (posts.map((post) => (
                <Link key={post.id} to={`/posts/${post.id}`}>
                <div key={post.id} className=" space-y-2 border shadow-lg sm:hover:scale-105   lg:hover:scale-110 ease-in-out duration-200 border-gray-400 p-4 rounded-lg">
                    <p className="text-center break-words">{post.title}</p>
                    <p>{(post.text).length > 20 ? (post.text.slice(0, 20)+"..."): post.text}</p>
                    <div className=" flex justify-between text-sm text-gray-500 ">
                        <p className="break-words">{post.date_added}</p>
                        <p className="break-words">{post.author}</p>
                    </div>
                </div>
                </Link>
            ))).slice(0, amountPosts) : !isLoading && <p>No posts to display</p>}
        
        </div>
        {isExtraLoading && 
            <button disabled type="button" className="text-white bg-yellow-700 flex  justify-center mx-auto hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800 ">
                                <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                </svg>
                            Loading older posts...
                            </button>}
        {amountPosts < posts.length &&!isLoading && <button  className=" flex justify-center mx-auto mt-6  p-2 rounded-lg hover:ring-2 hover:bg-yellow-500 focus:bg-yellow-500 hover:text-white text-yellow-700 hover:scale-110 duration-200 ease-in-out focus:text-white border-2 w-fit border-yellow-500 ring-yellow-700" onClick={handleMorePosts}>Show older Posts</button>}

    </main>
  )
}

export default Home