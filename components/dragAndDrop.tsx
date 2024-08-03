// components/DragAndDropUpload.tsx
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadImage } from '../apiUtils/cloudinary';

const DragAndDropUpload = () => {
  const [name, setName] = useState('');
  const [product, setProduct] = useState<any | null>(null);

  const onDrop = useCallback(async (acceptedFiles: any) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const uploadedProduct = await uploadImage(name, file);
      setProduct(uploadedProduct);
    }
  }, [name]);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({ 
    onDrop, 
    noClick: true, 
    noKeyboard: true 
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Upload Product</h2>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <div
        {...getRootProps()}
        className={`w-full p-4 border-2 border-dashed rounded cursor-pointer transition-colors ${
          isDragActive ? 'border-blue-400' : 'border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-center text-blue-400">Drop the files here...</p>
        ) : (
          <p className="text-center text-gray-400">Drag and drop files here</p>
        )}
      </div>
      <button
        type="button"
        onClick={open}
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Upload
      </button>
      {product && (
        <div className="mt-6 p-4 border rounded shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Uploaded Product:</h3>
          <p className="text-gray-700"><strong>Name:</strong> {product.name}</p>
          <img src={product.imageMetadata.imageUrl} alt={product.name} className="w-full h-auto mt-2 rounded" />
          <p className="text-gray-700 mt-2"><strong>Public ID:</strong> {product.imageMetadata.publicId}</p>
          <p className="text-gray-700"><strong>Format:</strong> {product.imageMetadata.format}</p>
          <p className="text-gray-700"><strong>Size:</strong> {product.imageMetadata.size} bytes</p>
        </div>
      )}
    </div>
  );
};

export default DragAndDropUpload;
