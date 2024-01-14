import SearchBar from './SearchBar';
import Favourites from './Favourites';

const Navbar = () => {
  return (
    <nav className="navigation">
      <p className="navigation__logo">BKCommerce</p>
      <SearchBar mobile={false} />
      <Favourites />
    </nav>
  );
};

export default Navbar;
