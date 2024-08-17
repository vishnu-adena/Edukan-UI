import React from 'react';
import Image from 'next/image';

interface CardProps {
  name: string;
  category: {
    name: string;
  };
  price: number;
  image: [
    {
      secureUrl: string;
      displayName: string;
    }
  ];
}

const Card: React.FC<CardProps> = (props: any) => {
  const imageUrl = props?.image?.[0]?.secureUrl || '/placeholder-image.jpg'; // Default image URL
  const imageAlt = props?.image?.[0]?.displayName || 'No image available';
  const productName = props?.name || 'Unnamed Product';
  const categoryName = props?.category || 'Unknown Category';
  const productPrice = props?.price !== undefined && props?.price !== null ? props?.price : 'N/A';

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-[250px] mb-4 p-5">
      <div className="flex flex-col items-center justify-center h-full">
        <Image
          src={imageUrl}
          alt={imageAlt}
          width={170}
          height={180}
          layout="intrinsic"
          className="object-cover rounded-lg"
        />
        <div className="p-4 w-full text-center">
          <h3 className="text-lg font-semibold truncate max-w-[200px] mb-2" title={productName}>
            {productName}
          </h3>
          <h3 className="text-gray-500 mb-1">{categoryName}</h3>
          <div>
            <p className="text-blue-500 font-bold">₹{productPrice}</p>
          </div>
          <button className="bg-blue-500 text-white py-2 px-6 m-3 rounded-md">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;