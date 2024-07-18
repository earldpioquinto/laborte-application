// src/FileUpload.js
import React, { useState } from 'react';
import useStore from '../store/dataStore';

function FileUpload() {
  const setFileContent = useStore((state) => state.setJsonData);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          setFileContent(json);
          setError(null);
        } catch (err) {
          setError('Failed to parse JSON');
          setFileContent(null);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <h2>Upload JSON File</h2>
      <input type="file" accept=".json" onChange={handleFileChange} />
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}

export default FileUpload;
