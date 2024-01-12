import SearchBar from './SearchBar';
import Favourites from './Favourites';

const Navbar = () => {
  return (
    <nav className="navigation">
      <p className="navigation-logo">BKCommerce</p>
      <SearchBar />
      <Favourites />
    </nav>
  );
};

export default Navbar;
