import React, { useState, useEffect, useRef } from 'react';
import image1 from '../images/image1.jpg'; // Replace with your image path
import image2 from '../images/image2.jpg'; // Replace with your image path
// ... (import more images if needed)

interface SlidingImageProps {}

const SlidingImage: React.FC<SlidingImageProps> = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = ["https://images-eu.ssl-images-amazon.com/images/G/31/INSLGW/pc_unrec_refresh._CB555261616_.jpg","https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/2024/June/GW/Hero/V1/V2/V3/BucketsMugsPC-3000._CB554160399_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Beauty/GW/Skincare-trust-Mobfdfo._CB554429490_.jpg",
  ] // ... (add more images to the array)]
  const timeoutRef = useRef(null);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    clearTimeout(timeoutRef.current);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIndex);
    clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      handleNext();
    }, 5000); // Change 5000 to adjust slide transition time (in milliseconds)

    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, images.length]);

  return (
    <div > {/* Adjust styles as needed */}
     
      <img className="" src={images[currentIndex]} alt="Slide Image" />
     
    </div>
  );
};

export default SlidingImage;
