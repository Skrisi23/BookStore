import React, { useState } from 'react';

function AddAuthorForm({ onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    birth_year: '',
    nationality: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onAdd(formData);
    setFormData({ name: '', birth_year: '', nationality: '' });
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
        <h5 className="card-title">Új szerző hozzáadása</h5>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label">Név</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Születési év</label>
              <input
                type="number"
                className="form-control"
                name="birth_year"
                value={formData.birth_year}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Nemzetiség</label>
              <input
                type="text"
                className="form-control"
                name="nationality"
                value={formData.nationality}
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

export default AddAuthorForm;
