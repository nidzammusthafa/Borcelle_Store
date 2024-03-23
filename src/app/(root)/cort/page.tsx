"use client";

import React from "react";
import { Heart } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import useCart from "@/lib/hooks/useCart";
import { useRouter } from "next/navigation";

const Cort = () => {
  const { user } = useUser();
  const cart = useCart();
  const router = useRouter();

  const total = cart.cartItems.reduce(
    (acc, item) => acc + item.item.price * item.quantity,
    0
  );
  const totalRounded = parseFloat(total.toFixed(2));

  const customer = {
    clerkId: user?.id,
    email: user?.emailAddresses[0].emailAddress,
    name: user?.fullName,
  };

  const handleCheckout = async () => {
    try {
      // const response = await fetch(
      //   `${process.env.NEXT_PUBLIC_API_URL}checkout`,
      //   {
      //     cache: "no-store",
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({ cartItems: cart.cartItems, customer }),
      //   }
      // );
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}products`
      );
      const data = await response.json();
      window.location.href = data.url;
      console.log(data);
    } catch (error) {
      console.log("[handleCheckout]_POST", error);
    }
  };

  return (
    <button onClick={handleCheckout}>
      <Heart />
    </button>
  );
};

export default Cort;
