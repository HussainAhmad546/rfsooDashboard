import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FaFileArchive, FaFile, FaFileImage } from 'react-icons/fa';
import { FiFileText } from 'react-icons/fi';
import {BiSolidFilePdf} from 'react-icons/bi';
import {BsFiletypeXls, BsFiletypePng} from 'react-icons/bs';
import {AiFillFileWord} from 'react-icons/ai';
import { useUser } from './../../Auth/UserContext';

const FolderComponent = () => {
  const { folderId, folderName } = useParams();
  const [fileContent, setFileContent] = useState([]);
  const [folderContent, setFolderContent] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [creatingFolder, setCreatingFolder] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const fileInputRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(null); // Add this line

  const { user } = useUser();


  const handleOutsideClick = (event) => {
    if (showDropdown && !event.target.closest('.dropdown')) {
      setShowDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [showDropdown]);


  useEffect(() => {
    axios.get(`http://localhost:8080/api/folders/${folderId}/files`)
      .then(response => setFileContent(response.data))
      .catch(error => console.error(error));

    axios.get(`http://localhost:8080/api/folders/${folderId}/folders`)
      .then(response => setFolderContent(response.data))
      .catch(error => {
        if (error.response) {
          if (error.response.status === 404) {
            console.error('Folders not found:', error.response.data);
          } else {
            console.error('Server error:', error.response.data);
          }
        } else if (error.request) {
          console.error('No response from the server');
        } else {
          console.error('Error setting up the request:', error.message);
        }
      });
  }, [folderId]);

  const handleFileClick = (file) => {
    console.log(`Clicked on file: ${file.name}`);
    deleteFileFromFolder(file._id);
  };

  const deleteFileFromFolder = async (fileId) => {
    try {
      await axios.delete(`http://localhost:8080/api/folders/${folderId}/files/${fileId}`);
      console.log(`File with ID ${fileId} deleted successfully`);

      const response = await axios.get(`http://localhost:8080/api/folders/${folderId}/files`);
      setFileContent(response.data);
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
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

  const handleCreateFolder = async () => {
    try {
      setCreatingFolder(true);

      const response = await axios.post(`http://localhost:8080/api/folders/${folderId}/create-folder`, { name: newFolderName });

      const newFolder = response.data?.message?.newFolder;

      if (newFolder && newFolder._id !== undefined) {
        setFolderContent(prevFolderContent => [...prevFolderContent, newFolder]);
        setNewFolderName('');
      } else {
        console.error('Folder ID not available in the server response:', response);
      }
    } catch (error) {
      console.error('Error creating folder:', error);
    } finally {
      setCreatingFolder(false);
      setShowCreateModal(false);
    }
  };

  function getFileIcon(fileType) {
    const blueColor = '#6b2a7d'; // Change this color to the desired blue color
    switch (fileType) {
      case 'pdf':
        return <BiSolidFilePdf style={{ fontSize: '48px', marginRight: '10px', color: blueColor }} />;
      case 'txt':
        return <FiFileText  style={{ fontSize: '48px', marginRight: '10px', color: blueColor  }} />;
      case 'zip':
        return <FaFileArchive style={{ fontSize: '48px', marginRight: '10px' , color: blueColor }} />;
      case 'psd':
        return <FaFileImage style={{ fontSize: '48px', marginRight: '10px', color: blueColor }} />;
      case 'xlsx':
        return <BsFiletypeXls style={{ fontSize: '48px', marginRight: '10px', color: blueColor }} />;
      case 'docx':
        return <AiFillFileWord style={{ fontSize: '48px', marginRight: '10px', color: blueColor }} />;
        case 'png':
          return <BsFiletypePng style={{ fontSize: '48px', marginRight: '10px', color: blueColor }} />;
      default:
        return <FaFile style={{ fontSize: '48px', marginRight: '10px', color: blueColor  }} />;
    }
  }

  const handleDownloadFile = (file) => {
    if (!file._id || !folderId) {
      console.error('File ID or Folder ID is missing.');
      return;
    }
  
    window.location.href = `http://localhost:8080/api/folders/${folderId}/files/${file._id}/download`;
  };
  

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
      <div style={{ flex: 1, marginRight: '20px', borderRight: '1px solid #ccc', paddingRight: '20px' }}>
        <h2>Contents of {folderName}</h2>
        <h4>Files</h4>
        {fileContent.length > 0 ? (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {fileContent.map(file => (
        <div key={file._id} style={{ flex: '0 0 30%', marginBottom: '10px', marginRight: '10px', border: '1px solid #ccc', padding: '10px', position: 'relative' }}>
          <li className="list-group-item d-flex flex-column align-items-center">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {getFileIcon(file.type)}
              <div style={{ marginTop: '5px' }}>{file.name}</div>
            </div>
            <div style={{ position: 'absolute', top: '5px', right: '5px' }}>
              <div className={`dropdown ${showDropdown === file._id ? 'show' : ''}`}>
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id={`fileOptions${file._id}`}
                  onClick={() => setShowDropdown(showDropdown === file._id ? null : file._id)}
                >
                  ⋮
                </button>
                <div className={`dropdown-menu ${showDropdown === file._id ? 'show' : ''}`} aria-labelledby={`fileOptions${file._id}`}>
                  {user?.isAdmin && (
                    <button className="dropdown-item" onClick={() => handleFileClick(file)}>
                      <span role="img" aria-label="Delete" style={{ fontSize: '18px', marginRight: '5px' }}>🗑️</span>
                        Delete
                    </button>
                 )}
                  <button className="dropdown-item" onClick={() => handleDownloadFile(file)}>
                    <span role="img" aria-label="Download" style={{ fontSize: '18px', marginRight: '5px' }}>📥</span>
                    Download
                  </button>
                </div>
              </div>
            </div>
          </li>
        </div>
      ))}
        </div>
      ) : (
        <p>No files in the folder</p>
      )}
        <h4>Folders</h4>
        {folderContent && Array.isArray(folderContent) && folderContent.length > 0 ? (
          <ul style={{ listStyleType: 'none', padding: 0, marginTop: '20px' }}>
            {folderContent.map(folder => (
              <li key={folder?._id} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                <span role="img" aria-label="Folder" style={{ marginRight: '10px' }}>📁</span>
                {folder && folder._id !== undefined ? (
                  folder._id
                ) : (
                  <p>Folder ID not available</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No folders in the folder</p>
        )}
      </div>
      <div style={{ display: 'flex',width: '30%', height:'80px' }}>
        <div style={{ width:'40%',height:'40px'}}>
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
              <Button style={{backgroundColor:'#6b2a7d'}} onClick={handleFileUpload} disabled={!selectedFile}>
                Upload
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div style={{width:'45%', height:'40px'}}>
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
  );
}

export default FolderComponent;

