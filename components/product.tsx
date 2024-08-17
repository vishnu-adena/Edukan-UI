import React, { useEffect, useState } from 'react';
import SlidingImage from './SlidingImages';
import { CircularLoading } from '@/commonHelpers/circularLoading';
import { product } from '@/apiUtils/productsapi';
import Card from "@/commonHelpers/card"

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

const CardCarousel: React.FC = () => {
  const [cards, setCards] = useState<CardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchCards() {
    try {
      const response = await product.get('/api/productservice/products');
      setCards(response.data);
    } catch (error) {
      console.error('Error fetching cards:', error);
      setError('Error fetching cards');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <>
      <div className="p-2">
        <SlidingImage />
      </div>
      {loading ? (
        <CircularLoading />
      ) : error ? (
        <div className="text-red-500 p-6">{error}</div>
      ) : (
        <div className="flex flex-wrap justify-between p-6">
          {cards.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
      )}
    </>
  );
};

export default CardCarousel;
