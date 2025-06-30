import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditPost({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [attachments, setAttachments] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/posts/${id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "게시글을 불러오는데 실패했습니다.");
      }

      if (data.data.authorId !== user.id) {
        navigate("/");
        return;
      }

      setFormData({
        title: data.data.title,
        content: data.data.content,
      });
      setAttachments(
        Array.isArray(data.data.attachments) ? data.data.attachments : []
      );
      setError(null);
    } catch (err) {
      console.error("게시글을 불러오는 중 오류가 발생했습니다:", err);
      setError("게시글을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setNewFiles(Array.from(e.target.files));
  };

  const handleRemoveAttachment = (idx) => {
    setAttachments((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }
    if (!formData.content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    try {
      setSubmitting(true);
      const form = new FormData();
      form.append("title", formData.title);
      form.append("content", formData.content);
      form.append("attachments", JSON.stringify(attachments));
      newFiles.forEach((file) => {
        form.append("files", file);
      });
      const response = await fetch(`/posts/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: form,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "게시글 수정에 실패했습니다.");
      }
      navigate(`/posts/${id}`);
    } catch (err) {
      console.error("게시글 수정 중 오류가 발생했습니다:", err);
      setError("게시글 수정에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container">
      <h2>게시글 수정</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            제목
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            내용
          </label>
          <textarea
            className="form-control"
            id="content"
            name="content"
            rows="10"
            value={formData.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">기존 첨부파일</label>
          {attachments.length === 0 ? (
            <div className="text-muted">첨부파일 없음</div>
          ) : (
            <ul>
              {attachments.map((file, idx) => (
                <li key={idx}>
                  <a
                    href={file.path ? file.path.replace(/^\./, "") : "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {file.originalname || file.filename}
                  </a>
                  <button
                    type="button"
                    className="btn btn-sm btn-danger ms-2"
                    onClick={() => handleRemoveAttachment(idx)}
                  >
                    삭제
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="files" className="form-label">
            첨부파일 추가
          </label>
          <input
            type="file"
            className="form-control"
            id="files"
            name="files"
            multiple
            onChange={handleFileChange}
          />
          {newFiles.length > 0 && (
            <ul className="mt-2">
              {newFiles.map((file, idx) => (
                <li key={idx}>{file.name}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(`/posts/${id}`)}
          >
            취소
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting ? "저장 중..." : "저장"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPost;
