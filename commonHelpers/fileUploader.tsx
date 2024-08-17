import React, { useState, useCallback } from 'react';
import axios from 'axios';

interface ImageUploaderProps {
    onUpload: (imageDetails: { url: string; publicId: string }[]) => void;
}

const FileUploader: React.FC<ImageUploaderProps> = ({ onUpload }) => {
    const [uploading, setUploading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [dragging, setDragging] = useState<boolean>(false);
    const [images, setImages] = useState<{ url: string; publicId: string }[]>([]);

    const handleDrop = useCallback(async (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragging(false);

        const files = event.dataTransfer.files;
        if (files.length > 0) {
            await uploadFiles(files);
        }
    }, []);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            await uploadFiles(event.target.files);
        }
    };

    const uploadFiles = async (files: FileList) => {
        setUploading(true);
        setError(null);

        const formData = new FormData();
        Array.from(files).forEach(file => {
            formData.append('files', file);
        });

        try {
            const response = await axios.post('/api/productservice/files/uploads', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            });
            
            setImages(response.data);
            onUpload(response.data);
        } catch (error) {
            console.error('Error uploading images:', error);
            setError('Error uploading images');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <div
                onDragEnter={() => setDragging(true)}
                onDragOver={(event) => {
                    event.preventDefault();
                    setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                style={{
                    border: dragging ? '2px dashed #007bff' : '2px solid #ccc',
                    padding: '20px',
                    textAlign: 'center',
                    cursor: 'pointer'
                }}
            >
                <input
                    type="file"
                    onChange={handleFileChange}
                    multiple
                    style={{ display: 'none' }}
                    id="fileInput"
                />
                <label htmlFor="fileInput" style={{ cursor: 'pointer', display: 'block', margin: '20px 0' }}>
                    {uploading ? 'Uploading...' : 'Drag & drop files here or click to select'}
                </label>
                <button
                    type="button"
                    onClick={() => document.getElementById('fileInput')?.click()}
                    style={{
                        display: 'block',
                        margin: '10px auto',
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Browse Files
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
            {images.length > 0 && (
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <h3>Uploaded Images</h3>
                    {images.map((image, index) => (
                        <div key={index} style={{ marginBottom: '20px' }}>
                            <img src={image.url} alt="Uploaded" style={{ maxWidth: '100%' }} />
                            <p>Public ID: {image.publicId}</p>
                            <p>URL: <a href={image.url} target="_blank" rel="noopener noreferrer">{image.url}</a></p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FileUploader;
