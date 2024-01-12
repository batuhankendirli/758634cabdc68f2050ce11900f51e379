import { useState } from 'react';
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io';

// TODO: Add type for this component
const ProductCard = ({ title, image, price, productType }) => {
  // TODO: Get the state with localStorage
  const [isFavourited, setIsFavourited] = useState(false);

  const handleFavourite = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();

    // TODO: Change this later, this is just for testing purposes!
    setIsFavourited((prevState) => !prevState);
  };

  const handleProductView = () => {
    // TODO: Trigger a popup by this click event
    console.log('Product...');
  };

  return (
    <div className="product" onClick={handleProductView}>
      <div className="product-top">
        <div className="product-top-wrapper">
          <span className="product-top-wrapper-tag">{productType}</span>
          <button
            className="product-top-wrapper-btn"
            onClick={(e) => handleFavourite(e)}
          >
            {isFavourited ? (
              <IoIosHeart
                className="product-top-wrapper-btn-icon"
                color="#f26c6b"
              />
            ) : (
              <IoIosHeartEmpty className="product-top-wrapper-btn-icon" />
            )}
          </button>
        </div>
        <img
          className="product-top-img"
          src={image}
          alt={`Image of ${title}`}
        />
      </div>
      <p className="product-title">{title}</p>
      <p className="product-price">${price}</p>
    </div>
  );
};

export default ProductCard;
