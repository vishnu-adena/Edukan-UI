import React from 'react';
import Image from 'next/image';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface ProductCardProps {
    id: number;
    image: { secureUrl: string }[];
    name: string;
    price: number;
    category: string;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = (props) => {
    // Create variables for each prop
    const id = props.id;
    const image = props.image?.[0]?.secureUrl || '/placeholder.jpg'; // Fallback image
    const name = props.name || 'Unnamed Product';
    const price = props?.price !== undefined && props?.price !== null ? props?.price : 'N/A';
    const category = props.category || 'Unknown Category';
    const onEdit = props.onEdit;
    const onDelete = props.onDelete;

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden w-[250px] mb-4 p-5">
            <div className="flex flex-col items-center justify-center h-full">
                <Image
                    src={image}
                    alt={name}
                    width={170}
                    height={180}
                    layout="intrinsic"
                    className="object-cover rounded-lg"
                />
                <div className="p-4 w-full text-center">
                    <h3 className="text-lg font-semibold truncate max-w-[200px] mb-2" title={name}>
                        {name}
                    </h3>
                    <h3 className="text-gray-500 mb-1">{category}</h3>
                    <div>
                        <p className="text-blue-500 font-bold">₹{price}</p>
                    </div>
                    <div className="flex justify-between mt-4 space-x-2">
                        <button
                            onClick={() => onEdit(id)}
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none flex items-center justify-center"
                        >
                            <EditIcon />
                        </button>
                        <button
                            onClick={() => onDelete(id)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none flex items-center justify-center"
                        >
                            <DeleteIcon />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
