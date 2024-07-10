// src/components/DragAndDropUpload.tsx

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const DragAndDropUpload: React.FC = () => {
  const [uploadStatus, setUploadStatus] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);

    const uploadFile = async () => {
      try {
        const response = await fetch('/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          setUploadStatus('File uploaded successfully');
        } else {
          setUploadStatus('File upload failed');
        }
      } catch (error) {
        setUploadStatus('An error occurred during file upload');
      }
    };

    uploadFile();
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed p-6 rounded-md text-center cursor-pointer ${
        isDragActive ? 'border-gray-600 bg-gray-100' : 'border-gray-300 bg-white'
      }`}
    >
      <input {...getInputProps()} />
      <p className="text-gray-600">Drag & drop a document here, or click to select a file</p>
      <p className="text-gray-600">{uploadStatus}</p>
    </div>
  );
};

export default DragAndDropUpload;
