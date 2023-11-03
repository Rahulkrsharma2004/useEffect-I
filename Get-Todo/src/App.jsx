import { useState, useEffect } from "react"
import PostItem from "./components/PostItem"
import axios from "axios"

const getData = async (url) => {
  try {
    let res = await axios.get(url)
    const totalCount = +res.headers.get("x-total-count")

    const totalPages = Math.ceil(totalCount / 10) // count/limit
    const data = res.data

    return {
      data: data,
      totalPages: totalPages,
    }
  } catch (error) {
    throw new Error(error)
  }
}

function App() {
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const [err, setErr] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchAndUpdateData(page)
  }, [page])

  const fetchAndUpdateData = async (page) => {
    setLoading(true)
    try {
      let output = await getData(
        `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`
      )
      const { data, totalPages } = output
      setTotalPages(totalPages)
      setPosts(data)
      setLoading(false)
    } catch (error) {
      setErr(true)
      setLoading(false)
    }
  }

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (err) {
    return <h1>Something went wrong.. please refresh</h1>
  }

  return (
    <>
    {posts.map((post) => (
        <PostItem key={post.id} id={post.id} title={post.title} />
      ))}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          PREVIOUS
        </button>
        <p>{page}</p>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          NEXT
        </button>
      </div>
    </>
  )
}

export default App