import axios from 'axios';
import { GetProductsResponse } from '../types/ProductTypes';

const apiURL: string = import.meta.env.VITE_API_URL;
const accessToken: string = import.meta.env.VITE_ACCESS_TOKEN;

const getProducts = async (): Promise<GetProductsResponse> => {
  try {
    const response = await axios.get(apiURL, {
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': accessToken,
      },
    });
    return response.data.products;
  } catch (error) {
    console.error('Error fetching products: ', error);
    throw error;
  }
};

export { getProducts };
