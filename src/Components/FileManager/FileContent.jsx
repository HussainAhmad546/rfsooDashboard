import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { FaFolder} from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { FaTrashAlt } from 'react-icons/fa';
import { useUser } from './../../Auth/UserContext';


function App() {
  const [folders, setFolders] = useState([]);
  const [newFolderName, setNewFolderName] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [creatingFolder, setCreatingFolder] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const fileInputRef = useRef(null);
  const { folderId, folderName } = useParams();
  const [fileContent, setFileContent] = useState([]);
  const [showDropdown, setShowDropdown] = useState(null); // Add this line

  const { user } = useUser();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/folders/${folderId}/files`)
      .then(response => setFileContent(response.data))
      .catch(error => console.error(error));
  }, [folderId]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/folders')
      .then(response => {
        setFolders(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleCreateFolder = () => {
    axios.post('http://localhost:8080/api/folders', { name: newFolderName })
      .then(response => {
        setFolders([...folders, response.data]);
        setNewFolderName('');
        setShowCreateModal(false);
      })
      .catch(error => console.error(error));
  };

  // const handleDeleteFolder = (folderId) => {
  //   axios.delete(`http://localhost:8080/api/folders/${folderId}`)
  //     .then(response => setFolders(folders.filter(folder => folder._id !== folderId)))
  //     .catch(error => console.error(error));
  // };
  const handleDeleteFolder = (folderId) => {
    // Assuming you have user details in local storage
    const user = JSON.parse(localStorage.getItem('user'));
  
    // Check if the user is an admin
    if (user && user.isAdmin) {
      axios.delete(`http://localhost:8080/api/folders/${folderId}`)
        .then(response => setFolders(folders.filter(folder => folder._id !== folderId)))
        .catch(error => console.error(error));
    } else {
      // Display a message or handle the case where the user is not an admin
      console.log('User is not an admin. Delete operation not allowed.');
    }
  };

  const handleFileUpload = async () => {
    try {
      setUploading(true);

      const formData = new FormData();
      formData.append('file', selectedFile);

      await axios.post(`http://localhost:8080/api/folders/${folderId}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const response = await axios.get(`http://localhost:8080/api/folders/${folderId}/files`);
      setFileContent(response.data);

      setSelectedFile(null);
      fileInputRef.current.value = '';
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
      setShowUploadModal(false);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div className="container mt-4">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Dashboard</h1>
        <div style={{ display: 'flex', width: '30%' }}>
          <div style={{ width: '40%', height: '40px' }}>
            <button onClick={() => setShowUploadModal(true)} style={{backgroundColor:'#6b2a7d', color:'white' , boxShadow: '0.5px 2px 10px rgb(107, 46, 122, 0.3)',padding: '5px',borderRadius:'5px'}}>Upload a File</button>
            <Modal show={showUploadModal} onHide={() => setShowUploadModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Upload a File</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <input
                  type="file"
                  onChange={handleFileChange}
                  name='file'
                  ref={fileInputRef}
                />
                {uploading && <p>Uploading...</p>}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={() => setShowUploadModal(false)}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleFileUpload} disabled={!selectedFile}>
                  Upload
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <div style={{ width: '45%', height: '40px' }}>
            <button onClick={() => setShowCreateModal(true)} style={{backgroundColor:'#6b2a7d', color:'white' , boxShadow: '0.5px 2px 10px rgb(107, 46, 122, 0.3)',padding: '5px',borderRadius:'5px'}}>Create a Folder</button>
            <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Create a Folder</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <input
                  type="text"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="Enter folder name"
                />
                {creatingFolder && <p>Creating folder...</p>}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={() => setShowCreateModal(false)}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleCreateFolder} disabled={!newFolderName}>
                  Create Folder
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {folders.map(folder => (
          <div key={folder._id} style={{ flex: '0 0 22%', marginBottom: '10px', marginRight: '10px', border: '1px solid #ccc', padding: '10px', position: 'relative' }}>
            <li className="list-group-item d-flex flex-column align-items-center">
              <Link to={`/folders/${folder._id}/${folder.name}`}>
                <span style={{ fontSize: '48px', color: '#6b2a7d' }}>
                  <FaFolder />
                </span>
                <div style={{ marginTop: '5px', color: 'black', textDecoration: 'none' }}>{folder.name}</div>
              </Link>
              <div style={{ position: 'absolute', top: '5px', right: '5px' }}>
              {user?.isAdmin && (
                <button className="dropdown-item" onClick={() => handleDeleteFolder(folder._id)}>
                  <FaTrashAlt style={{ fontSize: '18px', color: 'red' }} />
                </button>
              )}
             </div>
            </li>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}

export default App;

