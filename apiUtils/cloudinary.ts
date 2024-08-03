// lib/cloudinary.ts
export const uploadImage = async (name: string, file: File) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('file', file);
  
    const response = await fetch('http://localhost:8080/products/upload', { // Change URL if different
      method: 'POST',
      body: formData,
    });
  
    const data = await response.json();
    return data;
  };
  