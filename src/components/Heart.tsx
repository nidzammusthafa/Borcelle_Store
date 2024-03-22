"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";

const HeartButton = ({ product }: { product: ProductType }) => {
  const router = useRouter();
  const user = useUser();

  const [loading, setLoading] = useState(false);
  const [signedInUser, setSignedInUser] = useState<UserType | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  const getUser = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/users");
      const data = await response.json();
      setSignedInUser(data);
      setIsLiked(data.wishlist.includes(product._id));
      setLoading(false);
    } catch (error) {
      console.log("[getUser]", error);
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  const handleLike = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!user) {
      router.push("/sign-in");
      return;
    } else {
      try {
        setLoading(true);
        const response = await fetch("/api/users/wishlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: product._id,
          }),
        });

        const updatedUser = await response.json();

        setSignedInUser(updatedUser);
        setIsLiked(updatedUser.wishlist.includes(product._id));
      } catch (error) {
        console.log("[handleLike]", error);
      }
    }
  };
  return (
    <button onClick={handleLike}>
      <Heart fill={`${isLiked ? "red" : "white"}`} />
    </button>
  );
};

export default HeartButton;
