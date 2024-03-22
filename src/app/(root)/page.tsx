import Collections from "@/components/Collections";
import NavBar from "@/components/NavBar";
import ProductList from "@/components/ProductList";
import Image from "next/image";
import React from "react";

const HomePage = () => {
  return (
    <>
      <Image src="/banner.png" alt="banner" width={2000} height={1000} />
      <Collections />
      <ProductList />
    </>
  );
};

export default HomePage;
