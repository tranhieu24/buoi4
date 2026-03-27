import { useEffect, useState } from 'react'
import './PostList.css'

function PostList() {
  const [posts, setPosts] = useState([])        // data gốc
  const [filtered, setFiltered] = useState([])  // data hiển thị
  const [keyword, setKeyword] = useState('')

  // 👉 Fetch 1 lần
  useEffect(() => {
    async function fetchData() {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts')
      const data = await res.json()

      setPosts(data)
      setFiltered(data) // ban đầu hiển thị tất cả
    }

    fetchData()
  }, [])

  // 👉 Search (KHÔNG gọi lại API)
  useEffect(() => {
    const result = posts.filter(post =>
      post.title.toLowerCase().includes(keyword.toLowerCase())
    )

    setFiltered(result)
  }, [keyword, posts])

  return (
    <div className="container">
      <h2>Post List</h2>

      <input
        type="text"
        placeholder="Search by title..."
        className="search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <div className="list">
        {filtered.map(post => (
          <div key={post.id} className="card">
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PostList