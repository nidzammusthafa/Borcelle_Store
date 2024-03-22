"use client";

import Image from "next/image";

import React, { useState } from "react";

const Gallery = ({ productMedia }: { productMedia: string[] }) => {
  const [mainImage, setMainImage] = useState(productMedia[0]);

  return (
    <div className="flex flex-col gap-3 max-w-[500px]">
      <Image
        src={mainImage}
        width={800}
        height={800}
        alt="Product"
        className="h-96 w-96 rounded-lg shadow-xl object-cover"
      />
      <div className="flex gap-2 overflow-auto tailwind-scrolbar-hide">
        {productMedia.map((image: string, index) => (
          <Image
            key={index}
            src={image}
            width={200}
            height={200}
            alt="product"
            className={`w-20 h-20 rounded-lg object-cover cursor-pointer ${
              mainImage === image ? "border-2 border-slate-700" : ""
            }`}
            onClick={() => setMainImage(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
