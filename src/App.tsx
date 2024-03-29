import { useContext } from 'react';
import Filters from './components/Filters/Filters';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Pagination from './components/Pagination/Pagination';
import Products from './components/Products/Products';
import SearchInfo from './components/SearchInfo';
import { Context } from './Context';
import SearchBar from './components/SearchBar';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import FiltersSkeleton from './components/Filters/FiltersSkeleton';
import PaginationSkeleton from './components/Pagination/PaginationSkeleton';
import { ToastContainer } from 'react-toastify';
import { Slide } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';

const App = () => {
  const { activePage, filteredProducts, productsLoading } = useContext(Context);
  const paginatedProductsLength = filteredProducts.length;

  return (
    <div>
      <SkeletonTheme baseColor="#b7b7b7" highlightColor="#c8c8c8">
        <ToastContainer
          position="top-right"
          style={{
            fontSize: '1.4rem',

            lineHeight: '1.3',
          }}
          transition={Slide}
          theme="colored"
          closeOnClick={true}
          pauseOnFocusLoss={false}
          autoClose={3000}
          toastStyle={{
            animationDuration: '.3s',
            fontFamily: 'Poppins',
            fontWeight: '400',
          }}
          draggablePercent={30}
        />
        <Navbar />
        <div className="home">
          <SearchBar mobile />
          <span />
          <SearchInfo />
          {productsLoading ? <FiltersSkeleton /> : <Filters />}
          <Products />
        </div>
        {productsLoading ? (
          <PaginationSkeleton />
        ) : paginatedProductsLength ? (
          <Pagination
            currentPage={activePage}
            totalPage={paginatedProductsLength}
          />
        ) : null}
        <Footer />
      </SkeletonTheme>
    </div>
  );
};

export default App;
