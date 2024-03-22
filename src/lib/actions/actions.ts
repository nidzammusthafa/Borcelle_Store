export const getCollections = async () => {
  const collections = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}collections`,
    {
      cache: "no-store",
    }
  );
  return await collections.json();
};

export const getProducts = async () => {
  const products = await fetch(`${process.env.NEXT_PUBLIC_API_URL}products`, {
    cache: "no-store",
  });
  return await products.json();
};


export const getProductDetails = async (productId: string) => {
  const product = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}products/${productId}`,
    {
      cache: "no-store",
    }
  );
  return await product.json();
}