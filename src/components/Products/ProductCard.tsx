import { useContext, useState } from 'react';
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io';
import { Context } from '../../Context';
import { ProductCardProps } from '../../types/OtherTypes';
import Modal from '../Modal';
import Button from '../Button';
import { toast } from 'react-toastify';

const ProductCard = ({
  title,
  image,
  price,
  productType,
  productId,
}: ProductCardProps) => {
  const { favourites, setFavourites } = useContext(Context);
  const isFavourited = favourites.includes(productId);
  const [showModal, setShowModal] = useState(false);

  const handleFavourite = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();

    setFavourites((prevFavourites) => {
      if (isFavourited) {
        toast.success('An item has been removed from your favorites.', {
          autoClose: 3000,
          toastId: 'delete_one_fav',
        });
        return prevFavourites.filter((fav) => fav !== productId);
      } else {
        toast.success('An item has been added to your favorites.', {
          autoClose: 3000,
          toastId: 'add_one_fav',
        });
        return [...prevFavourites, productId];
      }
    });
  };

  const handleProductView = () => {
    setShowModal(true);
  };

  return (
    <>
      <Modal
        isVisible={showModal}
        onHide={() => setShowModal(false)}
        productID={productId}
      />
      <div className="product" onClick={handleProductView}>
        <div className="product__top">
          <div className="product__top-wrapper">
            <span className="product__top-wrapper-tag">{productType}</span>
            <Button
              heart
              className="product__top-wrapper-btn"
              onClick={(e) => handleFavourite(e)}
            >
              {isFavourited ? (
                <IoIosHeart className="button-heart-icon" color="#f26c6b" />
              ) : (
                <IoIosHeartEmpty className="button-heart-icon" />
              )}
            </Button>
          </div>
          <img
            className="product__top-img"
            src={image}
            alt={`Image of ${title}`}
          />
        </div>
        <p className="product__title">{title}</p>
        <p className="product__price">${price}</p>
      </div>
    </>
  );
};

export default ProductCard;
