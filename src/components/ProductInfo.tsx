"use client";

import { useUser } from "@clerk/nextjs";
import { Heart, MinusCircle, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import HeartButton from "./Heart";
import useCart from "@/lib/hooks/useCart";

const ProductInfo = ({ productInfo }: { productInfo: ProductType }) => {
  const [selectedColor, setSelectedColor] = useState<string>(
    productInfo.colors[0]
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    productInfo.sizes[0]
  );
  const [quantity, setQuantity] = useState<number>(1);

  const cart = useCart();

  return (
    <div className="max-w-[400px] flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="text-heading3-bold">{productInfo.title}</p>
        <HeartButton product={productInfo} />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-base-medium text-grey-2">Category:</p>
        <p>{productInfo.category}</p>
      </div>

      <p className="text-heading3-bold">{productInfo.price}</p>

      <div className="flex flex-col gap-2">
        <p className="text-small-medium text-grey-2">Description</p>
        <p>{productInfo.description}</p>
      </div>

      {productInfo.colors.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-base-medium text-grey-2">Color:</p>
          <div className="flex gap-2">
            {productInfo.colors.map((color: string, index) => (
              <p
                key={index}
                onClick={() => setSelectedColor(color)}
                className={`border border-black px-2 py-1 rounded-lg cursor-pointer${
                  selectedColor === color ? " bg-black text-white" : ""
                }`}
              >
                {color}
              </p>
            ))}
          </div>
        </div>
      )}

      {productInfo.sizes.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-base-medium text-grey-2">Color:</p>
          <div className="flex gap-2">
            {productInfo.sizes.map((size: string, index) => (
              <p
                key={index}
                onClick={() => setSelectedSize(size)}
                className={`border border-black px-2 py-1 rounded-lg cursor-pointer ${
                  selectedSize === size ? " bg-black text-white" : ""
                }`}
              >
                {size}
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <p className="text-base-medium text-grey-2">Quantity:</p>
        <div className="flex gap-4 items-center">
          <MinusCircle
            className="hover:text-red-1 cursor-pointer"
            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
          />
          <p className="text-body-bold">{quantity}</p>
          <PlusCircle
            className="hover:text-red-1 cursor-pointer"
            onClick={() => setQuantity(quantity + 1)}
          />
        </div>
      </div>

      <button
        className="outline text-base-bold py-3 rounded-lg hover:bg-black hover:text-white"
        onClick={() => {
          cart.addItem({
            item: productInfo,
            quantity,
            color: selectedColor,
            size: selectedSize,
          });
        }}
      >
        Add To Cart
      </button>
    </div>
  );
};

export default ProductInfo;
