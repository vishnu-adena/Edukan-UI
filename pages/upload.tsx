// components/ProductForm.tsx
import React, { useState } from 'react';
import Images from '../commonHelpers/imageuploader';

interface UploadResponse {
  secure_url: string;
  // Add other properties if needed
}

const ProductForm: React.FC = () => {
  const [productImage, setProductImage] = useState<string | null>(null);

  const handleImageUpload = (data: UploadResponse[]) => {
    setProductImage(data[0].secure_url);
    // Save other product details along with productImage URL to the backend
  };

  return (
    <form className="flex flex-col space-y-4">
      <input type="text" placeholder="Product Name" className="border p-2" />
      <Images multiple={false} onUpload={handleImageUpload} label="Upload Product Image" />
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
    </form>
  );
};

export default ProductForm;
