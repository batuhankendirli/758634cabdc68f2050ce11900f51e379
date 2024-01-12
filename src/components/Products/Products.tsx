import { useEffect, useState } from 'react';
import { getProducts } from '../../services/api';
import ProductCard from './ProductCard';

const Products = () => {
  const [data, setData] = useState<[]>([]);

  // TODO: Add type for products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getProducts();
        setData(products);
      } catch (error) {
        console.error('Error fetching products: ', error);
      }
    };
    fetchData();
  }, []);

  // !TEMP: This is temporary, remove it later.
  const mappedProducts = data.map((product) => {
    return (
      <ProductCard
        key={product.id}
        image={product.image.src}
        price={product.variants[0].price}
        productType={product.product_type}
        title={product.title}
      />
    );
  });

  return <div className="products">{mappedProducts}</div>;
};

export default Products;
