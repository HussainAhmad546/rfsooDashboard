// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { useParams, Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Spinner from 'react-bootstrap/Spinner';
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
// import Dropdown from 'react-bootstrap/Dropdown';
// import { FaFolder} from 'react-icons/fa';
// import { MdDeleteForever } from 'react-icons/md';
// import { FaTrashAlt } from 'react-icons/fa';
// import { useUser } from './../../Auth/UserContext';
// import { FaFileArchive, FaFile, FaFileImage } from 'react-icons/fa';
// import { FiFileText } from 'react-icons/fi';
// import {BiSolidFilePdf} from 'react-icons/bi';
// import {BsFiletypeXls, BsFiletypePng} from 'react-icons/bs';
// import {AiFillFileWord} from 'react-icons/ai';

// function App() {
//   const [folders, setFolders] = useState([]);
//   const [newFolderName, setNewFolderName] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [creatingFolder, setCreatingFolder] = useState(false);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showUploadModal, setShowUploadModal] = useState(false);
//   const fileInputRef = useRef(null);
//   const { folderId, folderName } = useParams();
//   const [fileContent, setFileContent] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(null); // Add this line

//   const { user } = useUser();

//   useEffect(() => {
//     axios.get(`http://localhost:8080/api/folders/${folderId}/files`)
//       .then(response => setFileContent(response.data))
//       .catch(error => console.error(error));
//   }, [folderId]);

//   useEffect(() => {
//     axios.get('http://localhost:8080/api/folders')
//       .then(response => {
//         setFolders(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error(error);
//         setLoading(false);
//       });
//   }, []);

//   const handleCreateFolder = () => {
//     axios.post('http://localhost:8080/api/folders', { name: newFolderName })
//       .then(response => {
//         setFolders([...folders, response.data]);
//         setNewFolderName('');
//         setShowCreateModal(false);
//       })
//       .catch(error => console.error(error));
//   };

//   const handleDeleteFolder = (folderId) => {
//     // Assuming you have user details in local storage
//     const user = JSON.parse(localStorage.getItem('user'));
  
//     // Check if the user is an admin
//     if (user && user.isAdmin) {
//       axios.delete(`http://localhost:8080/api/folders/${folderId}`)
//         .then(response => setFolders(folders.filter(folder => folder._id !== folderId)))
//         .catch(error => console.error(error));
//     } else {
//       // Display a message or handle the case where the user is not an admin
//       console.log('User is not an admin. Delete operation not allowed.');
//     }
//   };

//   const handleFileUpload = async () => {
//     try {
//       setUploading(true);
  
//       const formData = new FormData();
//       formData.append('file', selectedFile);
  
//       await axios.post('http://localhost:8080/api/files/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
  
//       // After successful upload, fetch the updated file list
//       const response = await axios.get('http://localhost:8080/api/files');
//       setFileContent(response.data);
  
//       setSelectedFile(null);
//       fileInputRef.current.value = '';
//     } catch (error) {
//       console.error('Error uploading file:', error);
//     } finally {
//       setUploading(false);
//       setShowUploadModal(false);
//     }
//   };
  
  
//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   function getFileIcon(fileType) {
//     const blueColor = '#6b2a7d'; // Change this color to the desired blue color
//     switch (fileType) {
//       case 'pdf':
//         return <BiSolidFilePdf style={{ fontSize: '48px', marginRight: '10px', color: blueColor }} />;
//       case 'txt':
//         return <FiFileText  style={{ fontSize: '48px', marginRight: '10px', color: blueColor  }} />;
//       case 'zip':
//         return <FaFileArchive style={{ fontSize: '48px', marginRight: '10px' , color: blueColor }} />;
//       case 'psd':
//         return <FaFileImage style={{ fontSize: '48px', marginRight: '10px', color: blueColor }} />;
//       case 'xlsx':
//         return <BsFiletypeXls style={{ fontSize: '48px', marginRight: '10px', color: blueColor }} />;
//       case 'docx':
//         return <AiFillFileWord style={{ fontSize: '48px', marginRight: '10px', color: blueColor }} />;
//         case 'png':
//           return <BsFiletypePng style={{ fontSize: '48px', marginRight: '10px', color: blueColor }} />;
//       default:
//         return <FaFile style={{ fontSize: '48px', marginRight: '10px', color: blueColor  }} />;
//     }
//   }

//   const handleDownloadFile = (file) => {
//     if (!file._id) {
//       console.error('File ID is missing.');
//       return;
//     }
  
//     window.location.href = `http://localhost:8080/api/files/${file._id}/download`;
//   };

//   const handleFileClick = (file) => {
//     console.log(`Clicked on file: ${file.name}`);
//     const confirmDelete = window.confirm(`Are you sure you want to delete ${file.name}?`);
    
//     if (confirmDelete) {
//       deleteSpecificFile(file._id);
//     }
//   };
  
//   const deleteSpecificFile = async (fileId) => {
//     try {
//       await axios.delete(`http://localhost:8080/api/files/${fileId}`);
//       console.log(`File with ID ${fileId} deleted successfully`);
  
//       const response = await axios.get(`http://localhost:8080/api/files`);
//       setFileContent(response.data);
//     } catch (error) {
//       console.error('Error deleting file:', error);
//     }
//   };
  
  
//   return (
//     <div className="container mt-4">
//       <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//         <h1>Folders</h1>
//         <div style={{ display: 'flex', width: '30%' }}>
//           <div style={{ width: '40%', height: '40px' }}>
//             <button onClick={() => setShowUploadModal(true)} style={{backgroundColor:'#6b2a7d', color:'white' , boxShadow: '0.5px 2px 10px rgb(107, 46, 122, 0.3)',padding: '5px',borderRadius:'5px'}}>Upload a File</button>
//             <Modal show={showUploadModal} onHide={() => setShowUploadModal(false)}>
//               <Modal.Header closeButton>
//                 <Modal.Title>Upload a File</Modal.Title>
//               </Modal.Header>
//               <Modal.Body>
//                 <input
//                   type="file"
//                   onChange={handleFileChange}
//                   name='file'
//                   ref={fileInputRef}
//                 />
//                 {uploading && <p>Uploading...</p>}
//               </Modal.Body>
//               <Modal.Footer>
//                 <Button variant="danger" onClick={() => setShowUploadModal(false)}>
//                   Close
//                 </Button>
//                 <Button variant="primary" onClick={handleFileUpload} disabled={!selectedFile}>
//                   Upload
//                 </Button>
//               </Modal.Footer>
//             </Modal>
//           </div>
//           <div style={{ width: '45%', height: '40px' }}>
//             <button onClick={() => setShowCreateModal(true)} style={{backgroundColor:'#6b2a7d', color:'white' , boxShadow: '0.5px 2px 10px rgb(107, 46, 122, 0.3)',padding: '5px',borderRadius:'5px'}}>Create a Folder</button>
//             <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
//               <Modal.Header closeButton>
//                 <Modal.Title>Create a Folder</Modal.Title>
//               </Modal.Header>
//               <Modal.Body>
//                 <input
//                   type="text"
//                   value={newFolderName}
//                   onChange={(e) => setNewFolderName(e.target.value)}
//                   placeholder="Enter folder name"
//                 />
//                 {creatingFolder && <p>Creating folder...</p>}
//               </Modal.Body>
//               <Modal.Footer>
//                 <Button variant="danger" onClick={() => setShowCreateModal(false)}>
//                   Close
//                 </Button>
//                 <Button variant="primary" onClick={handleCreateFolder} disabled={!newFolderName}>
//                   Create Folder
//                 </Button>
//               </Modal.Footer>
//             </Modal>
//           </div>
//         </div>
//       </div>
//       {loading ? (
//         <Spinner animation="border" role="status">
//           <span className="sr-only">Loading...</span>
//         </Spinner>
//       ) : (
//         <div style={{ display: 'flex', flexWrap: 'wrap' }}>
//         {folders.map(folder => (
//           <div key={folder._id} style={{ flex: '0 0 22%', marginBottom: '10px', marginRight: '10px', border: '1px solid #ccc', padding: '10px', position: 'relative' }}>
//             <li className="list-group-item d-flex flex-column align-items-center">
//               <Link to={`/folders/${folder._id}/${folder.name}`}>
//                 <span style={{ fontSize: '48px', color: '#6b2a7d' }}>
//                   <FaFolder />
//                 </span>
//                 <div style={{ marginTop: '5px', color: 'black', textDecoration: 'none' }}>{folder.name}</div>
//               </Link>
//               <div style={{ position: 'absolute', top: '5px', right: '5px' }}>
//               {user?.isAdmin && (
//                 <button className="dropdown-item" onClick={() => handleDeleteFolder(folder._id)}>
//                   <FaTrashAlt style={{ fontSize: '18px', color: 'red' }} />
//                 </button>
//               )}
//              </div>
//             </li>
//           </div>
//         ))}
//       </div>
//       )}
//       {/* Display Separate Files */}
//       <div style={{ flex: '0 0 22%', marginBottom: '10px', marginRight: '10px', padding: '10px', position: 'relative' }}>
//         <h5>Files:</h5>
//         {fileContent.length > 0 ? (
//         <div style={{ display: 'flex', flexWrap: 'wrap' }}>
//           {fileContent.map(file => (
//             <div key={file._id} style={{ flex: '0 0 30%', marginBottom: '10px', marginRight: '10px', border: '1px solid #ccc', padding: '10px', position: 'relative' }}>
//               <li className="list-group-item d-flex flex-column align-items-center">
//                 <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//                   {getFileIcon(file.type)}
//                   <div style={{ marginTop: '5px' }}>{file.name}</div>
//                 </div>
//                 <div style={{ position: 'absolute', top: '5px', right: '5px' }}>
//                   <div className={`dropdown ${showDropdown === file._id ? 'show' : ''}`}>
//                     <button
//                       className="btn btn-outline-secondary"
//                       type="button"
//                       id={`fileOptions${file._id}`}
//                       onClick={() => setShowDropdown(showDropdown === file._id ? null : file._id)}
//                     >
//                       ⋮
//                     </button>
//                     <div className={`dropdown-menu ${showDropdown === file._id ? 'show' : ''}`} aria-labelledby={`fileOptions${file._id}`}>
//                       {user?.isAdmin && (
//                         <button className="dropdown-item" onClick={() => handleFileClick(file)}>
//                           <span role="img" aria-label="Delete" style={{ fontSize: '18px', marginRight: '5px' }}>🗑️</span>
//                           Delete
//                         </button>
//                       )}
//                       <button className="dropdown-item" onClick={() => handleDownloadFile(file)}>
//                         <span role="img" aria-label="Download" style={{ fontSize: '18px', marginRight: '5px' }}>📥</span>
//                         Download
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </li>
//             </div>
//           ))}
//         </div>
//           ) : (
//             <p>No files here</p>
//           )}
//       </div>
//     </div>
//   );
// }

// export default App;

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
import { FaFileArchive, FaFile, FaFileImage } from 'react-icons/fa';
import { FiFileText } from 'react-icons/fi';
import {BiSolidFilePdf} from 'react-icons/bi';
import {BsFiletypeXls, BsFiletypePng} from 'react-icons/bs';
import {AiFillFileWord} from 'react-icons/ai';

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
  const backendUrl = 'https://rfsoo-backend.vercel.app';

  useEffect(() => {
    axios.get(`${backendUrl}/api/folders/${folderId}/files`)
      .then(response => setFileContent(response.data))
      .catch(error => console.error(error));
  }, [folderId]);

  useEffect(() => {
    axios.get(`${backendUrl}/api/folders`)
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
    axios.post(`${backendUrl}/api/folders`, { name: newFolderName })
      .then(response => {
        setFolders([...folders, response.data]);
        setNewFolderName('');
        setShowCreateModal(false);
      })
      .catch(error => console.error(error));
  };

  const handleDeleteFolder = (folderId) => {
    // Assuming you have user details in local storage
    const user = JSON.parse(localStorage.getItem('user'));
  
    // Check if the user is an admin
    if (user && user.isAdmin) {
      axios.delete(`${backendUrl}/api/folders/${folderId}`)
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
  
      await axios.post(`${backendUrl}/api/files/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // After successful upload, fetch the updated file list
      const response = await axios.get(`${backendUrl}/api/files`);
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
    if (!file._id) {
      console.error('File ID is missing.');
      return;
    }
  
    window.location.href = `${backendUrl}/api/files/${file._id}/download`;
  };

  const handleFileClick = (file) => {
    console.log(`Clicked on file: ${file.name}`);
    const confirmDelete = window.confirm(`Are you sure you want to delete ${file.name}?`);
    
    if (confirmDelete) {
      deleteSpecificFile(file._id);
    }
  };
  
  const deleteSpecificFile = async (fileId) => {
    try {
      await axios.delete(`${backendUrl}/api/files/${fileId}`);
      console.log(`File with ID ${fileId} deleted successfully`);
  
      const response = await axios.get(`${backendUrl}/api/files`);
      setFileContent(response.data);
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };
  
  
  return (
    <div className="container mt-4">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Folders</h1>
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
      {/* Display Separate Files */}
      <div style={{ flex: '0 0 22%', marginBottom: '10px', marginRight: '10px', padding: '10px', position: 'relative' }}>
        <h5>Files:</h5>
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
            <p>No files here</p>
          )}
      </div>
    </div>
  );
}

export default App;

