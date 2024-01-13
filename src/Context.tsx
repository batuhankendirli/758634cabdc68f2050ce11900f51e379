import { createContext, useState, useEffect } from 'react';
import { getProducts } from './services/api';
import { GetProductsResponse } from './types/ProductTypes';
import { ContextProps, ContextProviderProps } from './types/OtherTypes';
import paginateArray from './utils/pagination';

const Context = createContext<ContextProps>({
  products: [],
  setProducts: () => {},
  favourites: [],
  setFavourites: () => {},
  filteredProducts: [],
  setFilteredProducts: () => {},
  productType: '',
  setProductType: () => {},
  searchQuery: '',
  setSearchQuery: () => {},
  productsLoading: false,
  setProductsLoading: () => {},
  activePage: 1,
  setActivePage: () => {},
  sortOrder: 'unsorted',
  setSortOrder: () => {},
});

const ContextProvider = ({ children }: ContextProviderProps) => {
  const [favourites, setFavourites] = useState<number[]>(() => {
    const storedFavs = localStorage.getItem('favourites');
    return storedFavs ? JSON.parse(storedFavs) : [];
  });
  const [filteredProducts, setFilteredProducts] = useState<
    GetProductsResponse[]
  >([]);
  const [products, setProducts] = useState<GetProductsResponse>([]);
  const [productType, setProductType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [productsLoading, setProductsLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'unsorted'>(
    'unsorted'
  );

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  useEffect(() => {
    const fetchData = async () => {
      setProductsLoading(true);
      try {
        const result = await getProducts();
        setProducts(result);

        const paginated = paginateArray(result, 10);
        setFilteredProducts(paginated);

        setProductsLoading(false);
      } catch (error) {
        setProductsLoading(false);
        console.error('Error fetching products: ', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filterProducts = products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchQuery) &&
        (productType === 'All' ||
          product.product_type.toLowerCase() === productType.toLowerCase())
    );

    const sortedProducts = sortProducts(filterProducts, sortOrder);

    setFilteredProducts(paginateArray(sortedProducts, 10));
  }, [searchQuery, productType, products, activePage, sortOrder]);

  const sortProducts = (
    products: GetProductsResponse,
    order: 'asc' | 'desc' | 'unsorted'
  ) => {
    const sortedProducts = [...products];

    const convertPriceToNumber = (price: string) => {
      return parseFloat(price.replace(/[^0-9.]/g, ''));
    };

    if (order === 'asc') {
      sortedProducts.sort(
        (a, b) =>
          convertPriceToNumber(a.variants[0].price) -
          convertPriceToNumber(b.variants[0].price)
      );
    } else if (order === 'desc') {
      sortedProducts.sort(
        (a, b) =>
          convertPriceToNumber(b.variants[0].price) -
          convertPriceToNumber(a.variants[0].price)
      );
    }

    return sortedProducts;
  };

  return (
    <Context.Provider
      value={{
        products,
        setProducts,
        favourites,
        setFavourites,
        filteredProducts,
        setFilteredProducts,
        productType,
        setProductType,
        searchQuery,
        setSearchQuery,
        productsLoading,
        setProductsLoading,
        activePage,
        setActivePage,
        sortOrder,
        setSortOrder,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
