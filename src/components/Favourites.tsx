import { IoIosHeart } from 'react-icons/io';

const Favourites = () => {
  // TODO: Get favourites from localStorage and display them to the user
  // TODO: If there isn't any favourite product, inform user

  return (
    <div className="favourites">
      <button className="favourites-btn">
        <IoIosHeart className="favourites-btn-icon" />
      </button>
    </div>
  );
};

export default Favourites;
