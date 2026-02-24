import React, { useState, useEffect } from 'react';
import { getPurchases } from '../../api';

function PurchaseManagement() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, today, week, month
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const ac = new AbortController();
    loadPurchases(ac.signal);
    return () => ac.abort();
  }, []);

  const loadPurchases = async (signal) => {
    try {
      setLoading(true);
      const data = await getPurchases(signal);
      setPurchases(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error('Vásárlások betöltése sikertelen:', e);
    } finally {
      setLoading(false);
    }
  };

  // Szűrt adatok
  const getFilteredPurchases = () => {
    let filtered = [...purchases];

    // Időszak szűrés
    const now = new Date();
    if (filter === 'today') {
      const today = now.toISOString().split('T')[0];
      filtered = filtered.filter(p => p.payment_date?.startsWith(today));
    } else if (filter === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(p => new Date(p.payment_date) >= weekAgo);
    } else if (filter === 'month') {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(p => new Date(p.payment_date) >= monthAgo);
    }

    // Keresés
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(p =>
        p.user_name?.toLowerCase().includes(term) ||
        p.user_email?.toLowerCase().includes(term) ||
        p.books?.some(b => b.book_title?.toLowerCase().includes(term) || b.author_name?.toLowerCase().includes(term))
      );
    }

    return filtered;
  };

  const filteredPurchases = getFilteredPurchases();

  // Összesítések
  const totalRevenue = filteredPurchases.reduce((sum, p) => {
    const purchaseAmount = p.books?.reduce((s, b) => s + (b.price * b.quantity), 0) || 0;
    return sum + purchaseAmount;
  }, 0);

  const totalBooksSold = filteredPurchases.reduce((sum, p) => {
    return sum + (p.books?.reduce((s, b) => s + b.quantity, 0) || 0);
  }, 0);

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return d.toLocaleDateString('hu-HU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPaymentMethodLabel = (method) => {
    switch (method) {
      case 'card': return 'Bankkártya';
      case 'cash': return 'Utánvét';
      case 'transfer': return 'Átutalás';
      default: return method;
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Betöltés...</span>
        </div>
        <p className="mt-2 text-muted">Vásárlások betöltése...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Összesítő kártyák */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card" style={{ border: '1px solid #e0e0e0' }}>
            <div className="card-body text-center">
              <h6 className="text-muted mb-1">Összes vásárlás</h6>
              <h3 className="mb-0" style={{ fontWeight: 700 }}>{filteredPurchases.length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card" style={{ border: '1px solid #e0e0e0' }}>
            <div className="card-body text-center">
              <h6 className="text-muted mb-1">Eladott könyvek</h6>
              <h3 className="mb-0" style={{ fontWeight: 700 }}>{totalBooksSold} db</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card" style={{ border: '1px solid #e0e0e0' }}>
            <div className="card-body text-center">
              <h6 className="text-muted mb-1">Bevétel</h6>
              <h3 className="mb-0" style={{ fontWeight: 700, color: '#198754' }}>{totalRevenue.toLocaleString()} Ft</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Szűrők */}
      <div className="row mb-3">
        <div className="col-md-6">
          <div className="btn-group" role="group">
            {[
              { key: 'all', label: 'Összes' },
              { key: 'today', label: 'Ma' },
              { key: 'week', label: 'Elmúlt 7 nap' },
              { key: 'month', label: 'Elmúlt 30 nap' },
            ].map(f => (
              <button
                key={f.key}
                className={`btn btn-sm ${filter === f.key ? 'btn-dark' : 'btn-outline-secondary'}`}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-group input-group-sm">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Keresés (vevő, könyv, szerző)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="btn btn-outline-secondary" onClick={() => setSearchTerm('')}>
                <i className="bi bi-x"></i>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Vásárlások lista */}
      {filteredPurchases.length === 0 ? (
        <div className="alert alert-info">
          <i className="bi bi-info-circle me-2"></i>
          Nincs találat a megadott szűrőkkel.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle" style={{ fontSize: '0.9rem' }}>
            <thead style={{ backgroundColor: '#f8f8f8' }}>
              <tr>
                <th style={{ fontWeight: 600 }}>#</th>
                <th style={{ fontWeight: 600 }}>Dátum</th>
                <th style={{ fontWeight: 600 }}>Vevő</th>
                <th style={{ fontWeight: 600 }}>Könyvek</th>
                <th style={{ fontWeight: 600 }}>Fizetési mód</th>
                <th className="text-end" style={{ fontWeight: 600 }}>Összeg</th>
              </tr>
            </thead>
            <tbody>
              {filteredPurchases.map((purchase, index) => (
                <tr key={purchase.payment_id}>
                  <td className="text-muted">{index + 1}</td>
                  <td>
                    <small>{formatDate(purchase.payment_date)}</small>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{purchase.user_name || 'Ismeretlen'}</div>
                    <small className="text-muted">{purchase.user_email}</small>
                  </td>
                  <td>
                    {purchase.books?.map((book, bi) => (
                      <div key={bi} className="d-flex align-items-center mb-1">
                        {book.book_cover && (
                          <img
                            src={book.book_cover}
                            alt={book.book_title}
                            style={{ width: 30, height: 40, objectFit: 'cover', marginRight: 8, borderRadius: 2 }}
                          />
                        )}
                        <div>
                          <div style={{ fontWeight: 500 }}>
                            {book.book_title}
                            {book.quantity > 1 && (
                              <span className="badge bg-secondary ms-1" style={{ fontSize: '0.7rem' }}>
                                {book.quantity} db
                              </span>
                            )}
                          </div>
                          {book.author_name && (
                            <small className="text-muted">{book.author_name}</small>
                          )}
                        </div>
                      </div>
                    ))}
                  </td>
                  <td>
                    <span className="badge" style={{ backgroundColor: '#f0f0f0', color: '#333' }}>
                      {getPaymentMethodLabel(purchase.payment_method)}
                    </span>
                  </td>
                  <td className="text-end">
                    <strong style={{ color: '#198754' }}>
                      {purchase.books?.reduce((s, b) => s + (b.price * b.quantity), 0).toLocaleString()} Ft
                    </strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default PurchaseManagement;
