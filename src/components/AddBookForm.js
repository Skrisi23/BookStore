import React, { useState } from 'react';

function AddBookForm({ authors, onAdd }) {
  const [formData, setFormData] = useState({
    title: '',
    author_id: '',
    publication_year: '',
    isbn: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onAdd(formData);
    setFormData({ title: '', author_id: '', publication_year: '', isbn: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Új könyv hozzáadása</h5>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
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
            <div className="col-md-6 mb-3">
              <label className="form-label">Szerző</label>
              <select
                className="form-select"
                name="author_id"
                value={formData.author_id}
                onChange={handleChange}
                required
              >
                <option value="">Válassz szerzőt</option>
                {authors.map(author => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6 mb-3">
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
            <div className="col-md-6 mb-3">
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
          </div>
          <button type="submit" className="btn btn-success">
            Hozzáadás
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBookForm;
