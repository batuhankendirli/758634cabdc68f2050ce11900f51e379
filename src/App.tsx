import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Products from './components/Products/Products';

const App = () => {
  return (
    <div>
      <Navbar />
      {/* // TODO: Add filtering, sorting  */}
      <div className="home">
        <Products />
      </div>
      {/* // TODO: Add pagination */}
      <Footer />
    </div>
  );
};

export default App;
