import { useEffect, useState } from 'react';
import { getProducts } from './services/api';

const App = () => {
  const [data, setData] = useState<any>(null);

  // Gonna remove this later
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

  console.log(data);

  return <div>App</div>;
};

export default App;
