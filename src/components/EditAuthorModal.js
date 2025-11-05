import React, { useState, useEffect } from 'react';

function EditAuthorModal({ author, onUpdate, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    birth_year: '',
    nationality: ''
  });

  useEffect(() => {
    if (author) {
      setFormData({
        name: author.name,
        birth_year: author.birth_year,
        nationality: author.nationality
      });
    }
  }, [author]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onUpdate(author.id, formData);
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!author) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Szerző szerkesztése</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
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
              <div className="mb-3">
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
              <div className="mb-3">
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

export default EditAuthorModal;
