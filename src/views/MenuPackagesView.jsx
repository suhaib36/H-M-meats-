import React, { useState } from 'react';
import {
  UtensilsCrossed,
  Search,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  Flame,
  Sparkles,
  RotateCcw,
  Tag,
  AlertCircle
} from 'lucide-react';

export function MenuPackagesView({
  menuItems,
  onAddMenuItem,
  onUpdateMenuItem,
  onToggleActiveItem,
  onResetMenu
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const categories = ['All', 'BBQ Meats', 'Side Dishes', 'Desserts', 'Catering Packages'];

  // Filter items
  const filtered = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', maxWidth: '100%', minWidth: 0 }}>
      {/* Brand Menu Info Header */}
      <div
        className="card"
        style={{ padding: '18px 24px', backgroundColor: '#FFFFFF', border: '1px solid var(--hm-line)' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Flame size={20} color="#8F1D1D" />
              <h2 style={{ fontSize: 18, fontWeight: 800, color: '#1C1917' }}>
                H&amp;M Catering Menu &amp; Package Catalog
              </h2>
              <span className="badge badge-confirmed" style={{ fontSize: 11 }}>
                Live Catalog
              </span>
            </div>
            <p style={{ fontSize: 13, color: '#57534E', marginTop: 4, lineHeight: 1.45 }}>
              Authentic smoked meats, scratch-made sides, and signature party bars from H&amp;M Meats &amp; Catering (Nampa, ID). Staff can adjust live demo pricing and item availability.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="btn btn-primary"
            >
              <Plus size={16} />
              <span>Add Menu Item</span>
            </button>
          </div>
        </div>

        {/* Search & Category Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14, marginTop: 18, paddingTop: 14, borderTop: '1px solid var(--hm-line-light)' }}>
          {/* Category Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              const count = cat === 'All' ? menuItems.length : menuItems.filter(m => m.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: active ? 700 : 500,
                    backgroundColor: active ? '#8F1D1D' : '#FAF7F2',
                    color: active ? '#FFFFFF' : '#44403C',
                    border: active ? '1px solid #8F1D1D' : '1px solid #E7E2DA',
                    transition: 'all 0.1s ease'
                  }}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>

          {/* Search bar */}
          <div style={{ position: 'relative', width: 280 }}>
            <Search
              size={15}
              color="#78716C"
              style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              placeholder="Search dishes, meats, sides..."
              className="form-input"
              style={{ paddingLeft: 34, fontSize: 13 }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Grid of Menu Items */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 18 }}>
        {filtered.map((item) => {
          return (
            <div
              key={item.id}
              className="card"
              style={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                opacity: item.active ? 1 : 0.65,
                border: item.popular ? '1.5px solid #F59E0B' : '1px solid var(--hm-line)',
                backgroundColor: item.popular ? '#FFFDF8' : '#FFFFFF'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: 8 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1C1917' }}>
                        {item.name}
                      </h3>
                      {item.popular && (
                        <span
                          style={{
                            backgroundColor: '#FEF3C7',
                            color: '#92400E',
                            fontSize: 9.5,
                            fontWeight: 800,
                            padding: '1px 5px',
                            borderRadius: 4,
                            border: '1px solid #FDE68A'
                          }}
                        >
                          POPULAR
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#8F1D1D', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {item.category}
                    </span>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: 17, fontWeight: 800, color: '#1C1917' }}>
                      ${item.price.toFixed(2)}
                    </span>
                    <div style={{ fontSize: 11, color: '#78716C' }}>
                      {item.unit}
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: 12.5, color: '#57534E', lineHeight: 1.45, marginBottom: 14 }}>
                  {item.description}
                </p>

                {item.allergens && item.allergens.length > 0 && item.allergens[0] !== 'None' && (
                  <div style={{ fontSize: 11, color: '#A8A29E', marginBottom: 12 }}>
                    Contains: {item.allergens.join(', ')}
                  </div>
                )}
              </div>

              {/* Bottom Control Bar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--hm-line-light)', paddingTop: 12 }}>
                <button
                  onClick={() => onToggleActiveItem(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 12,
                    fontWeight: 600,
                    color: item.active ? '#15803D' : '#78716C',
                    cursor: 'pointer'
                  }}
                >
                  {item.active ? (
                    <CheckCircle size={15} color="#15803D" />
                  ) : (
                    <XCircle size={15} color="#78716C" />
                  )}
                  <span>{item.active ? 'Available' : 'Inactive'}</span>
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <button
                    onClick={() => setEditingItem(item)}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '4px 10px', fontSize: 12 }}
                  >
                    <Edit2 size={12} />
                    <span>Edit</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Item Modal */}
      {editingItem && (
        <EditItemModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSave={(updated) => {
            onUpdateMenuItem(updated);
            setEditingItem(null);
          }}
        />
      )}

      {/* Add Item Modal */}
      {isAddModalOpen && (
        <AddItemModal
          categories={categories.filter(c => c !== 'All')}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={(newItem) => {
            onAddMenuItem(newItem);
            setIsAddModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

// Subcomponent: Edit Item Modal
function EditItemModal({ item, onClose, onSave }) {
  const [formData, setFormData] = useState({ ...item });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      price: parseFloat(formData.price) || item.price
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 520 }}>
        <div className="modal-header">
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1C1917' }}>Edit Menu Item</h3>
          <button onClick={onClose} className="btn-icon">✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label form-label-required">Item Name</label>
              <input
                type="text"
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label form-label-required">Price ($)</label>
                <input
                  type="number"
                  step="0.25"
                  className="form-input"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label form-label-required">Unit</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  placeholder="e.g. per person, half rack"
                  required
                />
              </div>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label form-label-required">Category</label>
              <select
                className="form-select"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="BBQ Meats">BBQ Meats</option>
                <option value="Side Dishes">Side Dishes</option>
                <option value="Desserts">Desserts</option>
                <option value="Catering Packages">Catering Packages</option>
              </select>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Short Description</label>
              <textarea
                rows={3}
                className="form-textarea"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn btn-secondary btn-sm">Cancel</button>
            <button type="submit" className="btn btn-primary btn-sm">Save Item</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Subcomponent: Add Item Modal
function AddItemModal({ categories, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'BBQ Meats',
    price: 12.00,
    unit: 'per person',
    description: '',
    active: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      ...formData,
      id: `custom-${Date.now()}`,
      price: parseFloat(formData.price) || 10.00
    };
    onAdd(newItem);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 520 }}>
        <div className="modal-header">
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1C1917' }}>Add New Catering Item</h3>
          <button onClick={onClose} className="btn-icon">✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label form-label-required">Item Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Smoked Beef Ribs"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label form-label-required">Price ($)</label>
                <input
                  type="number"
                  step="0.25"
                  className="form-input"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label form-label-required">Unit</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  placeholder="per person"
                  required
                />
              </div>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label form-label-required">Category</label>
              <select
                className="form-select"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Description</label>
              <textarea
                rows={3}
                className="form-textarea"
                placeholder="Details on woods used, smoke time, spices..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn btn-secondary btn-sm">Cancel</button>
            <button type="submit" className="btn btn-primary btn-sm">Add to Catalog</button>
          </div>
        </form>
      </div>
    </div>
  );
}
