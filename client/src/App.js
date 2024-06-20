import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { uploadFile } from './service/api';
import { FiUpload, FiCopy } from 'react-icons/fi'; // Using Feather icons
import { PuffLoader } from 'react-spinners'; // For loading animation

function App() {
  const [file, setFile] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false); // State to handle loading
  const [buttonText, setButtonText] = useState('Upload File');

  const fileInputRef = useRef();

  const url = 'https://i.pinimg.com/originals/16/46/24/1646243661201a0892cc4b1a64fcbacf.jpg';

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        setLoading(true); // Start loading
        setButtonText('Uploading...');
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        try {
          const response = await uploadFile(data);
          setResult(response.path);
          setButtonText('Upload Again');
        } catch (error) {
          console.error("Error uploading file:", error);
          setButtonText('Upload File');
        }
        setLoading(false); // Stop loading after upload or error
      }
    }
    getImage();
  }, [file]);

  const onUploadClick = () => {
    fileInputRef.current.click();
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    alert("Link copied to clipboard!");
  }

  return (
    <div className='container'>
      <img src={url} className='img' alt="Uploaded" />
      <div className='wrapper'>
        <h1>Simple file sharing!</h1>
        <p>Upload and share the download link.</p>

        <label className="upload-button" onClick={onUploadClick}>
          {loading ? (
            <PuffLoader color="#fff" size={24} />
          ) : (
            <>
              <FiUpload className="upload-icon" />
              {buttonText}
            </>
          )}
        </label>
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => setFile(e.target.files[0])}
        />

        {result && (
          <div className="result-container">
            <a href={result} target='_blank' rel="noopener noreferrer">{result}</a>
            <button className="copy-button" onClick={copyToClipboard}>
              <FiCopy />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
