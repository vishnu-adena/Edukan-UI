import React, { useState, DragEvent } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Image from 'next/image';

interface UploadResponse {
  publicId:string;
  secureUrl: string;
  originalFileName: string;
  displayName: string;
}

interface CloudinaryUploaderProps {
  onUpload: (data: UploadResponse[]) => void;
  label?: string;
  multiple?: boolean;
}

const Images: React.FC<CloudinaryUploaderProps> = ({ onUpload, label = 'Upload Images', multiple = false }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadResponse[]>([]);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = React.createRef<HTMLInputElement>();

  const uploadToCloudinary = async (files: FileList) => {
    setUploading(true);
    const responses: UploadResponse[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'ml_default'); // Replace with your actual upload preset

      try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/dkndo6fhg/image/upload`, {
          method: 'POST',
          body: formData,
        });

        const data: any = await response.json();
        const filteredData: UploadResponse = {
          publicId: data?.public_id,
          secureUrl: data?.secure_url,
          originalFileName: data?.original_filename,
          displayName: data?.display_name
        };
  
        responses.push(filteredData);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }

    setUploadedFiles((prevFiles) => (multiple ? [...prevFiles, ...responses] : responses));
    onUpload(responses);
    setUploading(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      uploadToCloudinary(files);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const files = event.dataTransfer.files;
    if (files) {
      uploadToCloudinary(files);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div
        className={`w-full h-40 border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-4 ${
          dragging ? 'border-blue-500' : 'border-gray-300'
        } relative cursor-pointer transition-colors duration-200`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        {!uploading && (
          <div className="flex flex-col items-center text-center">
            <span className="text-gray-500 mb-2">Drag and Drop</span>
            <span className="text-gray-500 mb-2">or</span>
            <button
              type="button"
              className="border-2 border-black  bg-blue-600 text-white py-2 px-4 rounded-lg"
            >
              Upload
            </button>
            
          </div>
        )}
        {uploading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-75 rounded-lg z-10">
            <CircularProgress color="primary" />
            <span className="text-gray-400 mt-2">Uploading...</span>
          </div>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        multiple={multiple}
      />

      {uploadedFiles.length > 0 && (
        <div className="w-full mt-4 overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">S.No</th>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Image</th>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">File Name</th>
              </tr>
            </thead>
            <tbody>
              {uploadedFiles.map((file, index) => (
                <tr key={file.publicId} className="border-b">
                  <td className="py-2 px-4 text-sm text-gray-700">{index + 1}</td>
                  <td className="py-2 px-4">
                    <Image src={file.secureUrl} alt={file.originalFileName} width={50} height={50} className="w-5 h-5 object-cover rounded-lg" />
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-700">{file.originalFileName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Images;
