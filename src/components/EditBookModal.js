import React, { useState, useEffect } from 'react';

function EditBookModal({ book, authors, onUpdate, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    author_id: '',
    publication_year: '',
    isbn: ''
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author_id: book.author_id,
        publication_year: book.publication_year,
        isbn: book.isbn
      });
    }
  }, [book]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onUpdate(book.id, formData);
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!book) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Könyv szerkesztése</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Cím</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Szerző</label>
                <select
                  className="form-select"
                  name="author_id"
                  value={formData.author_id}
                  onChange={handleChange}
                  required
                >
                  {authors.map(author => (
                    <option key={author.id} value={author.id}>
                      {author.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Kiadás éve</label>
                <input
                  type="number"
                  className="form-control"
                  name="publication_year"
                  value={formData.publication_year}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">ISBN</label>
                <input
                  type="text"
                  className="form-control"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Mégse
                </button>
                <button type="submit" className="btn btn-primary">
                  Mentés
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditBookModal;
