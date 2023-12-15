import { Route, Routes } from "react-router-dom"
import Footer from "./components/Main/Footer"
import Header from "./components/Main/Header"
import Nav from "./components/Main/Nav"
import Home from "./components/Pages/Home"
import About from "./components/Pages/About"
import AddPost from "./components/Pages/AddPost"
import ShowPost from "./components/Pages/ShowPost"
import EditPost from "./components/Pages/EditPost"
import { useEffect, useState } from "react"


function App() {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState([])

 
    
    
  

  useEffect(() => {
    const searchFilter = posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()) || post.text.toLowerCase().includes(search.toLowerCase()));
    setSearchResult(searchFilter);
   
  }, [posts, search])


  return (
    <>
      <Header title="My Plans App"></Header>
      <Nav search={search} setSearch={setSearch} ></Nav>
      <Routes>
        <Route path="/" element={<Home  posts={searchResult} setPosts={setPosts}/>}></Route>
        <Route path="/posts" element={<AddPost posts={posts} setPosts={setPosts}/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/posts/:id" element={<ShowPost posts={posts} setPosts={setPosts}/>}></Route>
        <Route path="/edit/:id" element={<EditPost posts={posts} setPosts={setPosts}/>}></Route>
      </Routes>
      <Footer></Footer>
    </>
  )
}

export default App
