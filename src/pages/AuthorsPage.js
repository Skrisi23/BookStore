import React, { useState } from 'react';
import AuthorList from '../components/AuthorList';
import AddAuthorForm from '../components/AddAuthorForm';
import EditAuthorModal from '../components/EditAuthorModal';

function AuthorsPage({ authors, onAddAuthor, onUpdateAuthor, onDeleteAuthor, onRefresh }) {
  const [editingAuthor, setEditingAuthor] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm('Biztosan törölni szeretnéd ezt a szerzőt?')) {
      await onDeleteAuthor(id);
      onRefresh();
    }
  };

  const handleUpdate = async (id, data) => {
    await onUpdateAuthor(id, data);
    onRefresh();
    setEditingAuthor(null);
  };

  const handleAdd = async (data) => {
    await onAddAuthor(data);
    onRefresh();
  };

  return (
    <div>
      <h2 className="mb-4">Szerzők kezelése</h2>
      <AddAuthorForm onAdd={handleAdd} />
      <AuthorList 
        authors={authors}
        onEdit={setEditingAuthor}
        onDelete={handleDelete}
      />
      {editingAuthor && (
        <EditAuthorModal
          author={editingAuthor}
          onUpdate={handleUpdate}
          onClose={() => setEditingAuthor(null)}
        />
      )}
    </div>
  );
}

export default AuthorsPage;
