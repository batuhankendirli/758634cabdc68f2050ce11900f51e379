import { useContext } from 'react';
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io';
import { Context } from '../../Context';
import { ProductCardProps } from '../../types/OtherTypes';

const ProductCard = ({
  title,
  image,
  price,
  productType,
  productId,
}: ProductCardProps) => {
  const { favourites, setFavourites } = useContext(Context);
  const isFavourited = favourites.includes(productId);

  const handleFavourite = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();

    setFavourites((prevFavourites) => {
      if (isFavourited) {
        return prevFavourites.filter((fav) => fav !== productId);
      } else {
        return [...prevFavourites, productId];
      }
    });
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
