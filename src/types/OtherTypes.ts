import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { GetProductsResponse } from './ProductTypes';

// ContextTypes
export interface ContextProps {
  products: GetProductsResponse;
  setProducts: React.Dispatch<React.SetStateAction<GetProductsResponse>>;
  favourites: number[];
  setFavourites: React.Dispatch<React.SetStateAction<number[]>>;
  filteredProducts: GetProductsResponse[];
  setFilteredProducts: React.Dispatch<
    React.SetStateAction<GetProductsResponse[]>
  >;
  productType: string;
  setProductType: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  productsLoading: boolean;
  setProductsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  activePage: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  sortOrder: 'asc' | 'desc' | 'unsorted';
  setSortOrder: React.Dispatch<
    React.SetStateAction<'asc' | 'desc' | 'unsorted'>
  >;
}

export interface ContextProviderProps {
  children: ReactNode;
}

// ProductCard Type
export interface ProductCardProps {
  title: string;
  image: string;
  price: string;
  productType: string;
  productId: number;
}

// Pagination Type
export interface PaginationProps {
  currentPage: number;
  totalPage: number;
}

// Modal Type
export interface ModalProps {
  isVisible: boolean;
  onHide: () => void;
  productID: number;
}

// Button Type
export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode;
  primary?: boolean;
  heart?: boolean;
  danger?: boolean;
  circle?: boolean;
  big?: boolean;
  mid?: boolean;
  selected?: boolean;
}
