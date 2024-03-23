"use client";

import useCart from "@/lib/hooks/useCart";
import { useUser } from "@clerk/nextjs";
import { MinusCircle, PlusCircle, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Cart = () => {
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
      // if (!user) {
      //   router.push("/sign-in");
      // }
      // const response = await fetch(
      //   `${process.env.NEXT_PUBLIC_API_URL}checkout`,
      //   {
      //     cache: "no-store",
      //     method: "POST",
      //     body: JSON.stringify({ cartItems: cart.cartItems, customer }),
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}products`
      );
      const data = await response.json();
      // window.location.href = data.url;
      // console.log(data);
    } catch (error) {
      console.log("[handleCheckout]_POST", error);
    }
  };

  return (
    <div className="flex gap-20 py-16 px-10 max-lg:flex-col">
      <div className="w-2/3 max-lg:w-full">
        <p className="text-heading3-bold">Shopping Cart</p>
        <hr className="my-6" />

        {cart.cartItems.length === 0 ? (
          <p className="text-body-bold">No Item In Cart</p>
        ) : (
          <div className="">
            {cart.cartItems.map((cartItem, index) => (
              <div
                key={index}
                className="w-full max-sm:flex-col max-sm:gap-3 max-sm:items-start flex hover:bg-grey-1 px-6 py-5 items-center justify-between"
              >
                <div className="flex items-center">
                  <Image
                    src={cartItem.item.media[0]}
                    width={100}
                    height={100}
                    className="rounded-lg w-32 h-32 object-cover"
                    alt="product"
                  />
                  <div className="flex flex-col gap-3 ml-4">
                    <p className="text-body-bold">{cartItem.item.title}</p>
                    {cartItem.color && (
                      <p className="text-small-medium">
                        Color: {cartItem.color}
                      </p>
                    )}
                    {cartItem.size && (
                      <p className="text-small-medium">Size: {cartItem.size}</p>
                    )}
                    <p className="text-small-medium">
                      Price: ${cartItem.item.price}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <MinusCircle
                    className="hover:text-red-1 cursor-pointer"
                    onClick={() =>
                      cartItem.quantity > 1 &&
                      cart.decreaseQuantity(cartItem.item._id)
                    }
                  />
                  <p className="text-body-bold">{cartItem.quantity}</p>
                  <PlusCircle
                    className="hover:text-red-1 cursor-pointer"
                    onClick={() => cart.increaseQuantity(cartItem.item._id)}
                  />
                </div>

                <Trash
                  className="hover:text-red-1 cursor-pointer"
                  onClick={() => cart.removeItem(cartItem.item._id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="w-1/3 max-lg:w-full flex flex-col gap-8 bg-grey-1 rounded-lg px-4 py-5">
        <p className="text-heading4-bold pb-4">
          Summary{" "}
          <span>{`(${cart.cartItems.length} ${
            cart.cartItems.length > 1 ? "items" : "item"
          })`}</span>
        </p>
        <div className="flex justify-between text-body-semibold">
          <span>Total Amount</span>
          <span>${totalRounded}</span>
        </div>
        <button
          className="border rounded-lg text-body-bold bg-white py-3 w-full hover:bg-black hover:text-white"
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
