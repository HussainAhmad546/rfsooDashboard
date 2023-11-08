import React from 'react';

const ProfileModal = ({ showModal, closeModal, handleSubmit, formData, setFormData, handleImageSelection }) => {
  return (
    <div className={showModal ? "modal open" : "modal"}>
      <div className="modal-content">
        <h2>Upload Profile Image</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact">Contact</label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Profile Image</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageSelection}
            />
          </div>
          <button type="submit">Submit</button>
          <button onClick={closeModal}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
