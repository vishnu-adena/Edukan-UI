import React, { useState } from 'react';
import Image from 'next/image';

interface ProductCardProps {
    id: number;
    image: string;
    name: string;
    price: number;
    category: string;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, image, name, price, category, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden w-[250px] mb-4 p-5">
            <div className="flex flex-col items-center justify-center h-full">
                <Image
                    src={image}
                    alt={name}
                    width={170}
                    height={180}
                    layout="intrinsic"
                    className="object-cover rounded-lg" // Add rounded corners for a more polished look
                />
                <div className="p-4 w-full text-center">
                    <h3 className="text-lg font-semibold truncate max-w-[200px] mb-2" title={name}>
                        {name}
                    </h3>
                    <h3 className="text-gray-500 mb-1">{category}</h3>
                    <div>
                        <p className="text-blue-500 font-bold">₹{(((price * 10).toFixed(2)))}</p>
                    </div>
                    <div className="flex justify-between mt-4 space-x-2">
                        <button
                            onClick={() => onEdit(id)}
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                        >
                            ✏️Edit
                        </button>
                        <button
                            onClick={() => onDelete(id)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
                        >
                            🗑️Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
