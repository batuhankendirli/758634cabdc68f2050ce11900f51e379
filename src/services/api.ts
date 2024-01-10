import axios from 'axios';

const apiURL: string = import.meta.env.VITE_API_URL;
const accessToken: string = import.meta.env.VITE_ACCESS_TOKEN;

const getProducts = async () => {
  try {
    const response = await axios.get(apiURL, {
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': accessToken,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products: ', error);
    throw error;
  }
};

export { getProducts };
