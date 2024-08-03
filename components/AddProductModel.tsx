import React, { useState } from 'react';

interface AddProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (product: { image: string; name: string; price: number; category: string }) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        image: '',
        name: '',
        price: 0,
        category: '',
    });
    const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({
                    ...prev,
                    image: reader.result as string,
                }));
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({
            image: '',
            name: '',
            price: 0,
            category: '',
        });
        setImagePreview(null);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4">Add Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Image</label>
                        <input
                            title="Image"
                            placeholder="Upload Image"

                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                        {imagePreview && <img src={imagePreview as string} alt="Image Preview" className="mt-2 w-full h-40 object-cover" />}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            title='name'
                            placeholder='Enter Name of Product'
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Price</label>
                        <input
                            title='price'

                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Category</label>
                        <input
                            title='category'
                            placeholder='Enter Category'
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductModal;
