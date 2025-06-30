import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const fetchPosts = async (page) => {
    try {
      setLoading(true);
      const response = await fetch(`/posts?page=${page}`);
      const data = await response.json();
      console.log(`=== Data : ${JSON.stringify(data.data)}`);

      if (!response.ok) {
        throw new Error(data.message || "게시글을 불러오는데 실패했습니다.");
      }

      // setPosts(data.data.posts || []);
      setPosts(data.data || []);

      setTotalPages(
        // (data.data.pagination && data.data.pagination.totalPages) || 1
        1
      );

      console.log(`curPage : ${currentPage}, totalPage : ${totalPages}, `);
      setError(null);
    } catch (err) {
      console.error("게시글을 불러오는 중 오류가 발생했습니다:", err);
      setError("게시글을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <h2 className="mb-4">게시글 목록</h2>
      {posts.length === 0 ? (
        <div className="alert alert-info">
          게시글이 없습니다.
          <div> posts : {posts.length}</div>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>댓글</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>
                    <Link
                      to={`/posts/${post.id}`}
                      className="text-decoration-none"
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td>{post.author}</td>
                  <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                  <td>{post.comments?.length || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  이전
                </button>
              </li>
              {[...Array(totalPages)].map((_, i) => (
                <li
                  key={i + 1}
                  className={`page-item ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  다음
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      <div className="mt-3">
        <Link to="/create" className="btn btn-primary">
          새 게시글 작성
        </Link>
      </div>
    </div>
  );
}

export default PostList;
