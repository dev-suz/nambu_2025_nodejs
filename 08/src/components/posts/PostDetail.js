import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function PostDetail({ isAuthenticated, user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/posts/${id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "게시글을 불러오는데 실패했습니다.");
      }

      setPost(data.data);
      setError(null);
    } catch (err) {
      console.error("게시글을 불러오는 중 오류가 발생했습니다:", err);
      setError("게시글을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(`/posts/${id}/comments`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "댓글을 불러오는데 실패했습니다.");
      }

      setComments(data.data || []);
    } catch (err) {
      console.error("댓글을 불러오는 중 오류가 발생했습니다:", err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      return;
    }

    try {
      const response = await fetch(`/posts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "게시글 삭제에 실패했습니다.");
      }

      navigate("/");
    } catch (err) {
      console.error("게시글 삭제 중 오류가 발생했습니다:", err);
      alert("게시글 삭제에 실패했습니다.");
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setSubmitting(true);
      const response = await fetch(`/posts/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ content: newComment }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "댓글 작성에 실패했습니다.");
      }

      setNewComment("");
      fetchComments();
    } catch (err) {
      console.error("댓글 작성 중 오류가 발생했습니다:", err);
      alert("댓글 작성에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCommentDelete = async (commentId) => {
    if (!window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
      return;
    }

    try {
      const response = await fetch(`/posts/${id}/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "댓글 삭제에 실패했습니다.");
      }

      fetchComments();
    } catch (err) {
      console.error("댓글 삭제 중 오류가 발생했습니다:", err);
      alert("댓글 삭제에 실패했습니다.");
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!post)
    return (
      <div className="alert alert-warning">게시글을 찾을 수 없습니다.</div>
    );

  return (
    <div className="container">
      <div className="card mb-4">
        <div className="card-header">
          <h2>{post.title}</h2>
          <div className="text-muted">
            <small>작성자: {post.author}</small>
            <br />
            <small>작성일: {new Date(post.createdAt).toLocaleString()}</small>
          </div>
        </div>
        <div className="card-body">
          <div className="mb-4">
            {post.content.split("\\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
          {Array.isArray(post.attachments) && post.attachments.length > 0 && (
            <div className="mb-3">
              <strong>첨부파일:</strong>
              <ul>
                {post.attachments.map((file, idx) => (
                  <li key={idx}>
                    <a
                      href={
                        file.path
                          ? `http://localhost:3000/downloads/${encodeURIComponent(
                              file.filename
                            )}`
                          : "#"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                    >
                      {file.originalname || file.filename}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="card-footer d-flex justify-content-between">
          <div>
            <Link to="/" className="btn btn-secondary me-2">
              목록으로
            </Link>
          </div>
          {isAuthenticated && user && post.authorId === user.id && (
            <div>
              <Link to={`/edit/${post.id}`} className="btn btn-primary me-2">
                수정
              </Link>
              <button onClick={handleDelete} className="btn btn-danger">
                삭제
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>댓글</h3>
        </div>
        <div className="card-body">
          {isAuthenticated ? (
            <form onSubmit={handleCommentSubmit} className="mb-4">
              <div className="mb-3">
                <textarea
                  className="form-control"
                  rows="3"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="댓글을 입력하세요"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting}
              >
                {submitting ? "등록 중..." : "댓글 등록"}
              </button>
            </form>
          ) : (
            <div className="alert alert-info">
              댓글을 작성하려면 <Link to="/login">로그인</Link>이 필요합니다.
            </div>
          )}

          {comments.length === 0 ? (
            <p className="text-muted">아직 댓글이 없습니다.</p>
          ) : (
            <div className="list-group">
              {comments.map((comment) => (
                <div key={comment.id} className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <div>
                      <strong>{comment.author}</strong>
                      <small className="text-muted ms-2">
                        {new Date(comment.createdAt).toLocaleString()}
                      </small>
                    </div>
                    {isAuthenticated &&
                      user &&
                      comment.authorId === user.id && (
                        <button
                          onClick={() => handleCommentDelete(comment.id)}
                          className="btn btn-sm btn-danger"
                        >
                          삭제
                        </button>
                      )}
                  </div>
                  <p className="mt-2 mb-0">{comment.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
